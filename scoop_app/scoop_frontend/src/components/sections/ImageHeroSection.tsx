import React from 'react';

const ImageHeroSection: React.FC = () => {
  return (
    <section id="imageHero" className="bg-white py-10">
      <div className="mx-auto sm:px-7 px-4 max-w-screen-xl">      
        <a data-aos="fade-down" data-aos-delay="200" href="/"
            className="object-fill border border-black video-block block mx-auto mt-[-200px] relative bg-gray-900 rounded w-full aspect-video max-w-[600px]"
            style={{backgroundImage: 'url(./imgs/test.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className="flex items-center w-full h-full">
                <div className="absolute bottom-[-20px] flex w-full">
                    <span className="mx-auto shadow-md bg-purple-500 rounded-3xl text-white px-6 py-2">
                        <i className="bi bi-play-circle-fill text-lg pr-2"></i>
                        Watch the video
                    </span>
                </div>
            </div>
        </a>
        <div className="flex flex-col text-center pb-20 pt-20 lg:pt-28 pb-10 text-black max-w-screen-md mx-auto">
            <h2 className="text-4xl font-medium lg:text-7xl">How it's <span className="text-purple-500 font-bold"
                    style={{fontFamily: '"Nothing You Could Do", cursive'}}>works</span></h2>
            <span className="text-gray-600 pt-5 text-[20px] leading-[26px]">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum quam voluptatibus cupidatat.
                Lorem ipsum dolor sit amet consectetur.
            </span>
        </div>
        <div className="pb-10 lg:pb-20">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Feature 1 */}
                <div>
                    <svg className="w-8 h-8" viewBox="0 0 30 30" fill="none">
                        <path
                            d="M29.6931 14.2283L22.7556 6.87823C22.3292 6.426 21.6175 6.40538 21.1652 6.83212C20.7137 7.25851 20.6927 7.9706 21.1195 8.42248L27.3284 15L21.1195 21.5783C20.6927 22.0302 20.7137 22.7419 21.1652 23.1687C21.3827 23.3738 21.6606 23.4754 21.9374 23.4754C22.2363 23.4754 22.5348 23.3569 22.7557 23.1233L29.6932 15.7729C30.1022 15.339 30.1023 14.6618 29.6931 14.2283Z"
                            fill="#2D3748" />
                        <path
                            d="M8.88087 21.578L2.67236 15L8.88087 8.42215C9.30726 7.97028 9.28664 7.25812 8.83476 6.83179C8.38323 6.4054 7.67073 6.42603 7.2444 6.87791L0.306858 14.2279C-0.102245 14.6614 -0.102245 15.3391 0.306858 15.7726L7.24475 23.123C7.466 23.3574 7.76413 23.4755 8.06302 23.4755C8.33976 23.4755 8.61767 23.3735 8.83476 23.1684C9.28705 22.742 9.30726 22.0299 8.88087 21.578Z"
                            fill="#2D3748" />
                        <path
                            d="M16.8201 3.08774C16.2062 2.99476 15.6317 3.41622 15.5379 4.03011L12.2379 25.6302C12.1441 26.2445 12.566 26.8186 13.1803 26.9124C13.238 26.921 13.295 26.9252 13.3516 26.9252C13.898 26.9252 14.3773 26.5266 14.4624 25.97L17.7624 4.3699C17.8562 3.7556 17.4343 3.1815 16.8201 3.08774Z"
                            fill="#4299E1" />
                    </svg>
                    <h2 className="mt-4 text-xl font-semibold text-gray-800">Default Taiwindcss Config</h2>
                    <p className="mt-2 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim
                        fusce tortor, ac sed malesuada blandit. Et mi gravida sem feugiat.</p>
                </div>

                {/* Feature 2 */}
                <div>
                    <svg className="w-8 h-8" viewBox="0 0 30 30" fill="none">
                        <path
                            d="M27.3633 7.08984H26.4844V6.21094C26.4844 4.75705 25.3015 3.57422 23.8477 3.57422H4.39453C2.94064 3.57422 1.75781 4.75705 1.75781 6.21094V21.1523H0.878906C0.393516 21.1523 0 21.5459 0 22.0312V23.7891C0 25.2429 1.18283 26.4258 2.63672 26.4258H27.3633C28.8172 26.4258 30 25.2429 30 23.7891V9.72656C30 8.27268 28.8172 7.08984 27.3633 7.08984ZM3.51562 6.21094C3.51562 5.72631 3.9099 5.33203 4.39453 5.33203H23.8477C24.3323 5.33203 24.7266 5.72631 24.7266 6.21094V7.08984H20.332C18.8781 7.08984 17.6953 8.27268 17.6953 9.72656V21.1523H3.51562V6.21094ZM1.75781 23.7891V22.9102h27.6953V23.7891C17.6953 24.0971 17.7489 24.3929 17.8465 24.668H2.63672C2.15209 24.668 1.75781 24.2737 1.75781 23.7891ZM28.2422 23.7891C28.2422 24.2737 27.8479 24.668 27.3633 24.668H20.332C19.8474 24.668 19.4531 24.2737 19.4531 23.7891V9.72656C19.4531 9.24193 19.8474 8.84766 20.332 8.84766H27.3633C27.8479 8.84766 28.2422 9.24193 28.2422 9.72656V23.7891Z"
                            fill="#2D3748" />
                        <path
                            d="M24.7266 21.1523H22.9688C22.4834 21.1523 22.0898 21.5459 22.0898 22.0312C22.0898 22.5166 22.4834 22.9102 22.9688 22.9102H24.7266C25.212 22.9102 25.6055 22.5166 25.6055 22.0312C25.6055 21.5459 25.212 21.1523 24.7266 21.1523Z"
                            fill="#4299E1" />
                        <path
                            d="M23.8477 12.3633C24.3331 12.3633 24.7266 11.9698 24.7266 11.4844C24.7266 10.999 24.3331 10.6055 23.8477 10.6055C23.3622 10.6055 22.9688 10.999 22.9688 11.4844C22.9688 11.9698 23.3622 12.3633 23.8477 12.3633Z"
                            fill="#4299E1" />
                    </svg>
                    <h2 className="mt-4 text-xl font-semibold text-gray-800">Fully Responsive Components</h2>
                    <p className="mt-2 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim
                        fusce tortor, ac sed malesuada blandit. Et mi gravida sem feugiat.</p>
                </div>

                {/* Feature 3 */}
                <div>
                    <svg className="w-8 h-8" viewBox="0 0 30 30" fill="none">
                        <g clipPath="url(#clip0)">
                            <path
                                d="M26.599 4.339a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zM7.151 25.661a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zM23.486 13.163a8.636 8.636 0 00-1.19-2.873l1.123-1.123-2.592-2.59L19.705 7.7a8.636 8.636 0 00-2.873-1.19V4.921h-3.664v1.586a8.634 8.634 0 00-2.873 1.19l-1.122-1.12-2.592 2.589 1.123 1.123a8.636 8.636 0 00-1.19 2.873H4.922l-.002 3.663h2.592A8.626 8.626 0 007.704 19.7l-1.127 1.127 2.59 2.591 1.128-1.127a8.623 8.623 0 002.873 1.19v1.597h3.664v-1.597a8.628 8.628 0 002.873-1.19l1.128 1.128 2.59-2.592-1.127-1.127a8.627 8.627 0 001.19-2.873h2.593v-3.664h-1.593zM15 19.256a4.255 4.255 0 110-8.511 4.255 4.255 0 010 8.51z"
                                fill="#4299E1" />
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <path fill="#fff" d="M0 0h30v30H0z" />
                            </clipPath>
                        </defs>
                    </svg>
                    <h2 className="mt-4 text-xl font-semibold text-gray-800">RTL Languages Support</h2>
                    <p className="mt-2 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim
                        fusce tortor, ac sed malesuada blandit. Et mi gravida sem feugiat.</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ImageHeroSection;
