import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <footer className='border-t border-gray-100 mt-20'>

            <div className='flex flex-col sm:flex-row items-center justify-between gap-4 py-6 px-4'>

                {/* Logo */}
                <img src={assets.logo} alt='Imagify logo' width={130} />

                {/* Copyright */}
                <p className='sm:flex-1 sm:border-l sm:border-gray-200 sm:pl-4 text-sm text-gray-400 text-center sm:text-left'>
                    Copyright © Aditya's AI.dev &nbsp;|&nbsp; All rights reserved.
                </p>

                {/* Social icons */}
                <div className='flex gap-3'>
                    {[
                        { src: assets.facebook_icon, alt: 'Facebook' },
                        { src: assets.twitter_icon, alt: 'Twitter' },
                        { src: assets.instagram_icon, alt: 'Instagram' },
                    ].map(({ src, alt }) => (
                        <a
                            key={alt}
                            href='#'
                            aria-label={alt}
                            className='hover:opacity-80 hover:-translate-y-0.5 transition-all duration-200'
                        >
                            <img src={src} alt={alt} width={32} />
                        </a>
                    ))}
                </div>

            </div>

        </footer>
    )
}

export default Footer