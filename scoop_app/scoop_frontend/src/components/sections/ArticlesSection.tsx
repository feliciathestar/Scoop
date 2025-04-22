import React from 'react';

const ArticlesSection: React.FC = () => {
  return (
    <section id="articles" className="bg-white text-black gradiant-articles">
      <div className="mx-auto p-4 sm:px-7 px-4 max-w-screen-xl">
        <div className="flex flex-col text-center pt-10 pb-10 lg:pb-20 text-black max-w-screen-md mx-auto">
          <h2 className="text-4xl font-medium lg:text-7xl">Team <span className="text-purple-500 font-bold"
              style={{fontFamily: '"Nothing You Could Do", cursive'}}>blog</span></h2>
          <span className="text-gray-600 pt-5 text-[20px] leading-[26px]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum quam voluptatibus cupidatat.
            Lorem ipsum dolor sit amet consectetur.
          </span>
        </div>
        
        {/* Articles grid */}
        <ul className="grid grid-cols-12 gap-x-6 pb-10">
          {/* Article 1 */}
          <li className="col-span-12 md:col-span-4 mb-10 md:mb-0">
            <article>
              <header className="pb-4">
                <figure className="rounded overflow-hidden mb-4 border border-black">
                  <a href="/" className="block">
                    <img className="w-full hover:scale-125 transition duration-300"
                        src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="" />
                  </a>
                </figure>
                <ul className="flex mb-2">
                  <li className="mr-2">
                    <a href="/" className="rounded-3xl bg-purple-500 text-white p-1 px-4 text-xs block hover:bg-purple-600">App</a>
                  </li>
                  <li className="mr-2">
                    <a href="/" className="rounded-3xl text-gray-600 shadow p-1 px-4 text-xs block hover:bg-purple-600 hover:text-white">new</a>
                  </li>
                </ul>
                <h3 className="text-xl font-bold">
                  <a href="/" className="block hover:underline hover:text-purple-600">
                    "How we survive the crisis By trying our best and don't change our prices"
                  </a>
                </h3>
              </header>
              <footer className="flex items-center">
                <div>
                  <img className="w-[50px] h-[50px] mr-2 rounded-full"
                      src="https://fastly.picsum.photos/id/958/80/80.jpg?hmac=qQaLM3hjdts179LsTTY1mZ4TDbUklGCXnJJbh61OCkA"
                      alt="" />
                </div>
                <div>
                  <span className="font-light">By </span>
                  <a href="/" className="hover:underline">Lisa Allison</a>
                </div>
              </footer>
            </article>
          </li>
          
          {/* Article 2 and Article 3 would be similar */}
        </ul>
        
        {/* Technologies section */}
        <div className="flex flex-col text-center pt-10 pb-10 text-black max-w-screen-md mx-auto">
          <h2 className="text-4xl font-medium lg:text-7xl">
            <span className="text-purple-500 font-bold"
                style={{fontFamily: '"Nothing You Could Do", cursive'}}>Technos</span> we use
          </h2>
        </div>
        
        {/* Technology logos slider */}
        <div className="mx-auto mb-10">
          <div className="scroll imgBox" style={{"--time": "20s"} as React.CSSProperties}>
            <div>
              <img className="grayscale" src="./imgs/logos/html.png" alt="" />
              <img className="grayscale" src="./imgs/logos/css.png" alt="" />
              <img className="grayscale" src="./imgs/logos/js.png" alt="" />
              {/* More logos */}
            </div>
            <div>
              <img className="grayscale" src="./imgs/logos/html.png" alt="" />
              <img className="grayscale" src="./imgs/logos/css.png" alt="" />
              <img className="grayscale" src="./imgs/logos/js.png" alt="" />
              {/* More logos */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
