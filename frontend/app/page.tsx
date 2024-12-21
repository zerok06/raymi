import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import Wrapper from '@/components/Wrapper'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <nav>
        <Wrapper>
          <div className="h-20 flex justify-between items-center">
            <div>
              <Logo href="/" />
            </div>
            <div className="flex gap-4">
              <Button asChild variant={'outline'}>
                <Link href={'/signin'}>Sign In</Link>
              </Button>
              <Button asChild>
                <Link href={'/signup'}>Sign Up</Link>
              </Button>
            </div>
          </div>
        </Wrapper>
      </nav>
      <section className="h-[calc(100vh-80px)] backgroundRadial pt-40 overflow-hidden">
        <Wrapper>
          <div className="text-center ">
            <h2 className="text-5xl">Donde los organizadores</h2>
            <h1 className="text-6xl font-semibold text-ui-300">
              resuelven juntos
            </h1>
            <p className="text-xl text-white/70 max-w-[70%] mx-auto mt-6">
              Sabemos lo difícil que puede ser organizar un evento. Pero no
              tiene por qué ser así. Herramientas personalizadas, comunidades de
              apoyo y soluciones integrales, mucho mejores que lo que ya existe.
              Tal vez 😉
            </p>
          </div>
          <img
            src="/assets/images/preview.png"
            alt=""
            className="h-[600px] mx-auto mt-40 rounded-xl overflow-hidden shadowImage"
          />
        </Wrapper>
      </section>
    </main>
  )
}
