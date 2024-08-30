import { useSelector } from "react-redux";

const socialMediaIcons = {
  youtube: {
    iconSrc: "https://img.icons8.com/color/48/000000/youtube-play.png",
    altText: "youtube",
  },
  instagram: {
    iconSrc: "https://img.icons8.com/fluent/48/000000/instagram-new.png",
    altText: "instagram",
  },
  twitter: {
    iconSrc: "https://img.icons8.com/fluent/48/000000/twitter.png",
    altText: "twitter",
  },
  facebook: {
    iconSrc: "https://img.icons8.com/fluent/48/000000/facebook-new.png",
    altText: "facebook",
  },
};

const EventSocialHandles = () => {
  const { event } = useSelector((state) => state.events);

  return (
    <div>
      <div className="flex items-center my-8">
        <div className="flex items-center justify-between">
          {Object.entries(socialMediaIcons).map(
            ([socialMedia, icon]) =>
              event.socialProfiles?.[socialMedia] && (
                <a
                  key={socialMedia}
                  href={event.socialProfiles[socialMedia]}
                  target="_blank"
                  rel="noreferrer"
                  className="mx-3"
                >
                  <img
                    src={icon.iconSrc}
                    alt={icon.altText}
                    className="w-8 h-8 mr-2"
                  />
                </a>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default EventSocialHandles;
