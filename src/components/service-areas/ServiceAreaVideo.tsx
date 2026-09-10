import type { ServiceAreaVideo as ServiceAreaVideoData } from "@/lib/service-areas/videos";
import { ONSITE_YOUTUBE_CHANNEL_URL } from "@/lib/service-areas/videos";
import { VideoObjectSchema } from "./SchemaLd";

type Props = {
  areaName: string;
  video: ServiceAreaVideoData;
  pageUrl: string;
};

export default function ServiceAreaVideo({ areaName, video, pageUrl }: Props) {
  const description = `OnSite Real Estate Group listing tour in ${areaName}, Washington — from the team's YouTube channel.`;

  return (
    <section
      className="py-20 sm:py-28 bg-[#1a1a18] border-t border-charcoal"
      aria-labelledby="area-video-heading"
    >
      <VideoObjectSchema
        name={video.title}
        description={description}
        youtubeId={video.youtubeId}
        uploadDate={video.uploadDate}
        pageUrl={pageUrl}
      />

      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-10">
          <div className="lg:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/55 mb-5">
              OnSite on YouTube
            </p>
            <h2
              id="area-video-heading"
              className="font-serif text-[clamp(2rem,4vw,3.4rem)] font-light text-white leading-[1.08]"
            >
              A {areaName} listing,{" "}
              <span className="italic">on camera.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[16px] leading-8 text-white/70 mb-6">
              André and Cindie walk {areaName} inventory the same way they
              price it — street by street. This tour is from the OnSite Real
              Estate Group channel.
            </p>
            <a
              href={ONSITE_YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white/75 transition-all duration-300 hover:bg-white/10 hover:border-white/40"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3.5 w-3.5 text-[#FF0000]"
                aria-hidden
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Subscribe
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04]">
          <div className="relative aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
              loading="lazy"
            />
          </div>
          <div className="px-5 py-4 sm:px-6">
            <p className="text-[13px] leading-6 text-white/90">{video.title}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
