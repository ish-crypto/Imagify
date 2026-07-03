import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { motion, AnimatePresence } from 'motion/react'
import { AppContext } from '../context/App.Context'

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const {generateImage}=useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
if(input){
  const image = await generateImage(input)
  if(image){
    setIsImageLoaded(true)
    setImage(image)
  }
}
setLoading(false)
  }

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      className='flex flex-col min-h-[90vh] justify-center items-center'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >

      {/* Image + progress bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 120 }}
      >
        <div className='relative'>
          <motion.img
            src={image}
            alt=""
            className='max-w-sm rounded-xl shadow-lg'
            animate={{ opacity: loading ? 0.6 : 1 }}
            transition={{ duration: 0.4 }}
          />
          <span className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 
            rounded-full transition-all duration-[10s] ${loading ? 'w-full' : 'w-0'}`} />
        </div>

        <AnimatePresence>
          {loading && (
            <motion.p
              className='text-gray-500 text-sm mt-2 text-center animate-pulse'
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              Generating your image...
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Input bar */}
      <AnimatePresence>
        {!isImageLoaded && (
          <motion.div
            className='flex w-full max-w-xl bg-neutral-800 text-white text-sm p-0.5 mt-10 rounded-full shadow-md'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder='Describe what you want to generate...'
              className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder:text-gray-400'
            />
            <motion.button
              type='submit'
              disabled={loading || !input.trim()}
              className='bg-gradient-to-r from-violet-600 to-fuchsia-500 px-10 sm:px-16 py-3 
                rounded-full font-medium hover:opacity-90
                disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200'
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? 'Generating...' : 'Generate'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      <AnimatePresence>
        {isImageLoaded && (
          <motion.div
            className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 150 }}
          >
            <motion.button
              type='button'
              onClick={() => setIsImageLoaded(false)}
              className='border border-zinc-300 text-zinc-700 px-8 py-3 rounded-full 
                cursor-pointer hover:bg-zinc-50 transition-all duration-200'
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
            >
              Generate Another
            </motion.button>

            <motion.a
              href={image}
              download='imagify-result.png'
              className='inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 
                to-fuchsia-500 px-10 py-3 rounded-full cursor-pointer hover:opacity-90
                transition-all duration-200'
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none'
                viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' strokeLinejoin='round'
                  d='M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4' />
              </svg>
              Download
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.form>
  )
}

export default Result