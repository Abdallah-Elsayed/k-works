import { Suspense, useEffect, useState } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { TextureLoader, SRGBColorSpace } from 'three'
import { Link } from 'react-router-dom'
import './Studio.css'

const MATERIALS = [
  { id: 'oak', label: 'Oak' },
  { id: 'walnut', label: 'Walnut' },
  { id: 'ash', label: 'Ash' },
  { id: 'pine', label: 'Pine' },
]

const WOOD_COLOR = '#c4a574'

function fitInside(imageWidth, imageHeight, maxWidth, maxHeight) {
  if (!imageWidth || !imageHeight) {
    return { w: maxWidth, h: maxHeight }
  }

  const imageAspect = imageWidth / imageHeight
  const boxAspect = maxWidth / maxHeight

  // Keep the PNG shape. Scale it down so it stays inside the typed dimensions.
  if (imageAspect > boxAspect) {
    return { w: maxWidth, h: maxWidth / imageAspect }
  }

  return { w: maxHeight * imageAspect, h: maxHeight }
}

function PreviewModel({ imageUrl, width, height, thickness }) {
  const texture = useLoader(TextureLoader, imageUrl)
  texture.colorSpace = SRGBColorSpace
  texture.needsUpdate = true

  const w = Math.max(width, 0.5) / 20
  const h = Math.max(height, 0.5) / 20
  const t = Math.max(thickness, 0.4) / 20

  return (
    <mesh>
      <boxGeometry args={[w, h, t]} />
      {/* Box faces: +x, -x, +y, -y, +z (front), -z (back) */}
      <meshStandardMaterial attach="material-0" color={WOOD_COLOR} />
      <meshStandardMaterial attach="material-1" color={WOOD_COLOR} />
      <meshStandardMaterial attach="material-2" color={WOOD_COLOR} />
      <meshStandardMaterial attach="material-3" color={WOOD_COLOR} />
      <meshStandardMaterial
        attach="material-4"
        map={texture}
        transparent
        alphaTest={0.1}
      />
      <meshStandardMaterial attach="material-5" color={WOOD_COLOR} />
    </mesh>
  )
}

async function removeLightBackground(img) {
  const canvas = document.createElement('canvas')
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight

  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const pixels = imageData.data

  // Pixels lighter than this become transparent
  const threshold = 170

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i]
    const g = pixels[i + 1]
    const b = pixels[i + 2]
    const a = pixels[i + 3]

    // Already transparent: leave it
    if (a < 10) continue

    // Near-white / pale background: punch a hole
    if (r >= threshold && g >= threshold && b >= threshold) {
      pixels[i + 3] = 0
    }
  }

  ctx.putImageData(imageData, 0, 0)

  const blob = await new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/png')
  })

  return URL.createObjectURL(blob)
}

function Studio() {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imageSize, setImageSize] = useState(null)

  const [material, setMaterial] = useState('oak')
  const [carveThickness, setCarveThickness] = useState('0.5')
  const [width, setWidth] = useState('40')
  const [height, setHeight] = useState('30')
  const [boardThickness, setBoardThickness] = useState('2')
  const [comments, setComments] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const maxW = Number(width) || 40
  const maxH = Number(height) || 30
  const boardNum = Number(boardThickness) || 2

  const fitted = fitInside(
    imageSize?.width,
    imageSize?.height,
    maxW,
    maxH
  )

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl)
    }
  }, [imageUrl])

   function handleFile(event) {
    const nextFile = event.target.files?.[0]
    if (!nextFile) return

    if (nextFile.type !== 'image/png') {
      setMessage('Please choose a PNG file.')
      setFile(null)
      setFileName('')
      setImageUrl('')
      setImageSize(null)
      return
    }

    const originalUrl = URL.createObjectURL(nextFile)
    const img = new Image()

    img.onload = async () => {
      const cleanedUrl = await removeLightBackground(img)
      URL.revokeObjectURL(originalUrl)

      setImageSize({ width: img.naturalWidth, height: img.naturalHeight })
      setFile(nextFile)
      setFileName(nextFile.name)
      setImageUrl(cleanedUrl)
      setMessage('')
    }

    img.src = originalUrl
  }

  function handleQuote(event) {
    event.preventDefault()
    if (!file) {
      setMessage('Upload a PNG first.')
      return
    }
    setMessage('Preview is ready. Sending the quote comes in the next step.')
  }

  return (
    <div className="studio">
      <header className="studio-header">
        <h1>Studio</h1>
        <p>Upload a PNG, set the size, then review the 3D board.</p>
      </header>

      <div className="studio-layout">
        <section className="studio-preview">
          <h2>3D preview</h2>

          {!imageUrl ? (
            <div className="studio-empty">
              Upload a PNG on the right to generate the preview.
            </div>
          ) : (
            <>
              <p className="studio-preview-meta">
                {MATERIALS.find((item) => item.id === material)?.label} · fitted{' '}
                {fitted.w.toFixed(1)} × {fitted.h.toFixed(1)} cm · board{' '}
                {boardNum} cm · carve {carveThickness} cm
              </p>

              <div className="studio-canvas">
                <Canvas camera={{ position: [4, 3, 7], fov: 35 }}>
                  <ambientLight intensity={0.85} />
                  <directionalLight position={[6, 6, 6]} intensity={1.15} />
                  <Suspense fallback={null}>
                    <PreviewModel
                      imageUrl={imageUrl}
                      width={fitted.w}
                      height={fitted.h}
                      thickness={boardNum}
                    />
                  </Suspense>
                  <OrbitControls enablePan={false} />
                </Canvas>
              </div>
            </>
          )}

          <p className="studio-help">
            Drag to rotate. The board keeps the picture’s shape and stays
            inside the width and height you enter.
          </p>
        </section>

        <form className="studio-form" onSubmit={handleQuote}>
          <label>
            Design (PNG only)
            <input
              type="file"
              accept="image/png,.png"
              onChange={handleFile}
            />
          </label>
          {fileName && <p className="studio-file">{fileName}</p>}

          <label>
            Material
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            >
              {MATERIALS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Carving thickness (cm)
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={carveThickness}
              onChange={(e) => setCarveThickness(e.target.value)}
              required
            />
          </label>

          <fieldset className="studio-dims">
            <legend>Max piece size (cm)</legend>
            <label>
              Width
              <input
                type="number"
                min="1"
                step="0.1"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                required
              />
            </label>
            <label>
              Height
              <input
                type="number"
                min="1"
                step="0.1"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
              />
            </label>
            <label>
              Board thickness
              <input
                type="number"
                min="0.4"
                step="0.1"
                value={boardThickness}
                onChange={(e) => setBoardThickness(e.target.value)}
                required
              />
            </label>
          </fieldset>

          <label>
            Comments
            <textarea
              rows={4}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="What should this piece do?"
            />
          </label>

          <label>
            Your email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <button className="btn btn-gold" type="submit">
            Request a quote
          </button>

          {message && <p className="studio-message">{message}</p>}
        </form>
      </div>

      <p className="studio-contact">
        Prefer to talk first? <Link to="/contact">Go to Contact</Link>
      </p>
    </div>
  )
}

export default Studio