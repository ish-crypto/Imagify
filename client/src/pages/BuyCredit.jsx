import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/App.Context'
import { motion } from 'motion/react'

const BuyCredit = () => {
  const { user, payRazorpay, loadingPlanId } = useContext(AppContext)

  return (
    <motion.div
      className='min-h-[80vh] text-center pt-14 mb-10 px-4'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >

      {/* Badge */}
      <motion.button
        className='border border-gray-300 px-10 py-2 rounded-full mb-6 text-sm text-gray-500
          hover:border-violet-300 hover:text-violet-500 transition-all duration-300'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Our Plans
      </motion.button>

      {/* Heading */}
      <motion.h1
        className='text-3xl sm:text-4xl font-medium mb-12'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Choose the{' '}
        <span className='bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent'>
          right plan
        </span>
      </motion.h1>

      {/* Plans */}
      <div className='flex flex-wrap justify-center gap-8'>
        {plans.map((item, index) => {
          const isLoading = loadingPlanId === item.id
          const isAnyLoading = loadingPlanId !== null

          return (
            <motion.div
              key={item.id}
              className='bg-white border border-gray-200 rounded-2xl shadow-sm p-8 w-80
                flex flex-col items-center'
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.3 + index * 0.15,
                duration: 0.5,
                type: 'spring',
                stiffness: 120
              }}
              whileHover={!isAnyLoading ? {
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(139, 92, 246, 0.15)',
                borderColor: '#c4b5fd'
              } : {}}
            >
              {/* Icon */}
              <motion.img
                src={assets.logo_icon}
                alt=""
                className='w-14 mx-auto mb-4'
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />

              {/* Plan name */}
              <h2 className='text-xl font-semibold mb-2'>
                {item.id}
              </h2>

              {/* Description */}
              <p className='text-gray-500 mb-6 text-sm'>
                {item.desc}
              </p>

              {/* Price */}
              <motion.p
                className='text-4xl font-bold text-zinc-900 mb-1'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.15, duration: 0.4 }}
              >
                ${item.price}
              </motion.p>
              <p className='text-sm text-gray-400 mb-6'>
                {item.credits} credits included
              </p>

              {/* CTA Button */}
              <motion.button
                onClick={() => payRazorpay(item.id)}
                disabled={isAnyLoading}
                className='w-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white
                  py-3 rounded-full font-medium transition-all duration-200
                  disabled:cursor-not-allowed'
                style={{ opacity: isAnyLoading && !isLoading ? 0.5 : 1 }}
                whileHover={{ scale: isAnyLoading ? 1 : 1.04 }}
                whileTap={{ scale: isAnyLoading ? 1 : 0.96 }}
              >
                {isLoading ? (
                  <span className='flex items-center justify-center gap-2'>
                    <svg
                      className='animate-spin h-4 w-4 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12' cy='12' r='10'
                        stroke='currentColor' strokeWidth='4'
                      />
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8v8z'
                      />
                    </svg>
                    Processing...
                  </span>
                ) : user ? 'Purchase' : 'Get Started'}
              </motion.button>

            </motion.div>
          )
        })}
      </div>

    </motion.div>
  )
}

export default BuyCredit