import { auth } from "@/app/_lib/auth";
import Link from "next/link";

export default async function Navigation() {
  const session = await auth()

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins" className="hover:text-accent-400 transition-colors">
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about" className="hover:text-accent-400 transition-colors">
            About
          </Link>
        </li>
        <li>
          {
            session ? <div className="flex items-center gap-3 justify-center">
              <Link
                href="/account"
                className="hover:text-accent-400 transition-colors"
              >
                <span>
                  Guest area
                </span>
              </Link>
              <p className="text-sm">{session.user.name}</p>
            </div>
              : <Link
                href="/account"
                className="hover:text-accent-400 transition-colors"
              >
                Guest area
              </Link>
          }
        </li>
      </ul>
    </nav>
  );
}
