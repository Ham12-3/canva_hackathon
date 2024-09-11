import { useGetVdoCipherOTPMutation } from "@/redux/features/courses/coursesApi";
import React, { FC, useEffect, useState } from "react";

type Props = {
  videoUrl: string; // This should be the videoId, not a full URL
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
  const [getVdoCipherOTP, { data: videoData, isLoading, error }] =
    useGetVdoCipherOTPMutation(); // Use the mutation hook

  useEffect(() => {
    // Ensure we have a videoUrl (videoId) before making the request
    if (videoUrl) {
      getVdoCipherOTP(videoUrl); // Trigger the mutation to fetch OTP and playback info
      console.log(videoUrl, "videoUrl");
      console.log(videoData, "videoData");
    }
  }, [videoUrl, getVdoCipherOTP]);

  if (isLoading) return <div>Loading video...</div>; // Handle loading state
  if (error) return <div>Failed to load video.</div>; // Handle error state

  return (
    <div
      style={{ paddingTop: "56.25%", position: "relative", overflow: "hidden" }}
    >
      {/* Only render the video player if OTP and playbackInfo are available */}
      {videoData?.otp && videoData?.playbackInfo && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=kewyUXPwkS94ewYR`}
          style={{
            border: 0,
            width: "90%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
