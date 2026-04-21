import type { User } from "@/generated/prisma/client";
import type { ProfileUserFields } from "@/interfaces";

interface Props {
  user: ProfileUserFields;
}

const roleLabel: Record<User["role"], string> = {
  admin: "Administrador",
  user: "Usuario",
};

export const ProfileUserInfo = ({ user }: Props) => {
  const verifiedLabel = user.emailVerified
    ? new Date(user.emailVerified).toLocaleDateString("es", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Sin verificar";

  return (
    <div className="max-w-xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element -- avatares pueden venir de dominios no configurados en next/image
          <img
            src={user.image}
            alt=""
            width={96}
            height={96}
            className="h-24 w-24 shrink-0 rounded-full object-cover ring-2 ring-gray-100"
          />
        ) : (
          <div
            className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gray-200 text-2xl font-semibold text-gray-600 ring-2 ring-gray-100"
            aria-hidden
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h2 className="truncate text-2xl font-semibold text-gray-900">{user.name}</h2>
          <p className="mt-1 truncate text-gray-600">{user.email}</p>
          <span className="mt-3 inline-flex rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
            {roleLabel[user.role]}
          </span>
        </div>
      </div>

      <dl className="mt-8 space-y-4 border-t border-gray-100 pt-6 text-sm">
        <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
          <dt className="font-medium text-gray-500">Correo verificado</dt>
          <dd className="text-gray-900">{verifiedLabel}</dd>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
          <dt className="font-medium text-gray-500">Identificador</dt>
          <dd className="break-all font-mono text-xs text-gray-700">{user.id}</dd>
        </div>
      </dl>
    </div>
  );
};
