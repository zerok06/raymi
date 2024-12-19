import Wrapper from '@/components/Wrapper'
import React from 'react'

const Page = () => {
  return (
    <>
      <nav className="h-10">Filters</nav>
      <h1>Home</h1>

      <section className="flex flex-wrap gap-6">
        {[1, 2, 3, 4, 6, 7, 8, 9, 10].map(item => (
          <div key={item} className="w-[300px]">
            <div className="border-2 border-white/10 p-4 rounded-lg  min-h-[412px]">
              <nav className="h-6 text-sm">nav</nav>
              <h3 className="text-lg font-semibold text-white/80 text-balance">
                Diseño de API 101: desde los conceptos básicos hasta las mejores
                prácticas
              </h3>
              <div className="flex flex-wrap py-1 gap-1">
                {[1, 2, 3, 4].map(item => (
                  <a
                    href="#"
                    className="px-2 py-1 rounded-sm border  text-xs text-white/50"
                  >
                    #exacto
                  </a>
                ))}
              </div>
              <div>
                <p className="text-sm text-white/50">Dec 3, 2023</p>
              </div>
              <img
                className="my-2 w-full rounded-md"
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              />
              <div className="flex justify-between">
                <div>likes</div>
                <div>share</div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}

export default Page
