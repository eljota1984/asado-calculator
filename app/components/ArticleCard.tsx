import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "../lib/posts";

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const accentClasses = {
  red: "border-red-500/30 text-red-300 bg-red-500/10",
  yellow: "border-yellow-500/30 text-yellow-300 bg-yellow-500/10",
  green: "border-green-500/30 text-green-300 bg-green-500/10",
};

function getCategoryIcon(category: string) {
  const normalizedCategory = normalizeText(category);

  if (normalizedCategory === "consejos") return "💡";
  if (normalizedCategory === "recetas") return "👨‍🍳";
  if (normalizedCategory === "opiniones") return "📣";

  return "🔥";
}

export default function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/80 transition hover:-translate-y-1 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-950/20"
    >
      <div className="relative h-44 overflow-hidden bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.45),transparent_55%),linear-gradient(135deg,#18181b,#09090b)]">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.imageAlt ?? post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute bottom-4 left-4 text-5xl">
            {getCategoryIcon(post.category)}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      </div>

      <div className="p-5">
        <span
          className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-widest ${
            accentClasses[post.accent]
          }`}
        >
          {post.category}
        </span>

        <h3 className="mt-4 text-lg font-black leading-tight text-white group-hover:text-red-300">
          {post.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-zinc-400">
          {post.excerpt}
        </p>

        <p className="mt-4 text-xs text-zinc-500">⏱ {post.readTime}</p>
      </div>
    </Link>
  );
}
//import Link from "next/link";
// import type { BlogPost } from "../lib/posts";

// function normalizeText(value: string) {
//   return value
//     .toLowerCase()
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "");
// }

// const accentClasses = {
//   red: "border-red-500/30 text-red-300 bg-red-500/10",
//   yellow: "border-yellow-500/30 text-yellow-300 bg-yellow-500/10",
//   green: "border-green-500/30 text-green-300 bg-green-500/10",
// };

// function getCategoryIcon(category: string) {
//   const normalizedCategory = normalizeText(category);

//   if (normalizedCategory === "consejos") return "💡";
//   if (normalizedCategory === "recetas") return "👨‍🍳";
//   if (normalizedCategory === "opiniones") return "📣";

//   return "🥩";
// }

// export default function ArticleCard({ post }: { post: BlogPost }) {
//   return (
//     <Link
//       href={`/blog/${post.slug}`}
//       className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/80 transition hover:-translate-y-1 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-950/20"
//     >
//       <div className="relative h-36 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.45),transparent_55%),linear-gradient(135deg,#18181b,#09090b)]">
//         <div className="absolute bottom-4 left-4 text-5xl">
//           {getCategoryIcon(post.category)}
//         </div>
//       </div>

//       <div className="p-5">
//         <span
//           className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-widest ${
//             accentClasses[post.accent]
//           }`}
//         >
//           {post.category}
//         </span>

//         <h3 className="mt-4 text-lg font-black leading-tight text-white group-hover:text-red-300">
//           {post.title}
//         </h3>

//         <p className="mt-3 text-sm leading-6 text-zinc-400">
//           {post.excerpt}
//         </p>

//         <p className="mt-4 text-xs text-zinc-500">⏱ {post.readTime}</p>
//       </div>
//     </Link>
//   );
// }
// // import Link from "next/link";
// // import type { BlogPost } from "../lib/posts";

// // const accentClasses = {
// //   red: "border-red-500/30 text-red-300 bg-red-500/10",
// //   yellow: "border-yellow-500/30 text-yellow-300 bg-yellow-500/10",
// //   green: "border-green-500/30 text-green-300 bg-green-500/10",
// // };

// // export default function ArticleCard({ post }: { post: BlogPost }) {
// //   return (
// //     <Link
// //       href={`/blog/${post.slug}`}
// //       className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/80 transition hover:-translate-y-1 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-950/20"
// //     >
// //       <div className="relative h-36 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.45),transparent_55%),linear-gradient(135deg,#18181b,#09090b)]">
// //         <div className="absolute bottom-4 left-4 text-5xl">🥩</div>
// //       </div>

// //       <div className="p-5">
// //         <span
// //           className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-widest ${
// //             accentClasses[post.accent]
// //           }`}
// //         >
// //           {post.category}
// //         </span>

// //         <h3 className="mt-4 text-lg font-black leading-tight text-white group-hover:text-red-300">
// //           {post.title}
// //         </h3>

// //         <p className="mt-3 text-sm leading-6 text-zinc-400">
// //           {post.excerpt}
// //         </p>

// //         <p className="mt-4 text-xs text-zinc-500">⏱ {post.readTime}</p>
// //       </div>
// //     </Link>
// //   );
// // }