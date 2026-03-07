import { useEffect, useState } from "react";
import api from "../api/api";
import mapimage from "../assets/mapimage.jpg";
import { Helmet } from "react-helmet-async";
import PageAnimation from "../components/PageAnimation";

export default function Contact() {
  const mainColor = "#009E66";

  const [contact, setContact] = useState({});

  const loadContact = async () => {
    try {
      const res = await api.get("/contact");
      setContact(res.data || {});
    } catch (err) {
      console.error("Contact Load Error:", err);
      setContact({});
    }
  };

  useEffect(() => {
    loadContact();
  }, []);

  return (
    <PageAnimation>
      <div className="flex flex-col items-center w-full">

        <Helmet>
          <title>Contact | Dr Nagendra Kumar | IIITV</title>

          <meta
            name="description"
            content="Contact Dr Nagendra Kumar, Nagendra Lab, Department of Physical Sciences."
          />

          <meta name="robots" content="index, follow" />

          <link
            rel="canonical"
            href="https://nagendra-sir-xkun.vercel.app/#contact"
          />
        </Helmet>

        {/* PAGE TITLE */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mt-10 mb-10 py-2 px-6 sm:px-10 border-2 border-[#009e66] text-[#009E66]">
          Contact
        </h1>

        <div className="w-full max-w-6xl px-4 sm:px-6">

          {/* TOP SECTION */}
          <div className="flex flex-col items-center gap-8 md:items-start md:gap-10 md:flex-row">

            {/* PROFILE IMAGE */}
            <div className="flex-shrink-0">
              <div
                className="w-32 h-32 overflow-hidden border-2 rounded-full sm:w-40 sm:h-40"
                style={{ borderColor: mainColor }}
              >
                <img
                  src={contact?.photoUrl || "/defaultProfile.png"}
                  alt="profile"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* TEXT SECTION */}
            <div className="flex gap-4">

              {/* VERTICAL LINE */}
              <div
                className="hidden md:block w-[2px] h-60 rounded-full"
                style={{ backgroundColor: mainColor }}
              ></div>

              <div className="flex flex-col items-start text-left">

                {/* NAME */}
                <h2 className="text-xl font-bold sm:text-2xl">
                  {contact?.name || (
                    <span className="text-base font-normal text-gray-400">
                      Name not available
                    </span>
                  )}
                </h2>

                {/* PROFESSION */}
                <p className="text-base font-semibold sm:text-lg">
                  {contact?.profession || (
                    <span className="text-sm font-normal text-gray-400">
                      Profession not available
                    </span>
                  )}
                </p>

                {/* DEPARTMENT */}
                <p className="text-base font-semibold sm:text-lg">
                  {contact?.department || (
                    <span className="text-sm font-normal text-gray-400">
                      Department not available
                    </span>
                  )}
                </p>

                {/* EMAIL */}
                <p className="mt-2 font-semibold">
                  Email:
                  {contact?.emailPrimary ? (
                    <a
                      href={`mailto:${contact.emailPrimary}`}
                      className="ml-2 text-blue-500 underline"
                    >
                      {contact.emailPrimary}
                    </a>
                  ) : (
                    <span className="ml-2 text-sm text-gray-400">
                      not available
                    </span>
                  )}
                </p>

                {contact?.emailSecondary && (
                  <a
                    href={`mailto:${contact.emailSecondary}`}
                    className="font-semibold text-blue-500 underline"
                  >
                    {contact.emailSecondary}
                  </a>
                )}

                {/* ADDRESS */}
                <p className="mt-6 text-base font-semibold leading-relaxed sm:text-lg">
                  {contact?.addressLine1 ? (
                    <>
                      {contact.addressLine1} <br />
                      {contact.city || ""} {contact.state || ""}{" "}
                      {contact.pincode ? `– ${contact.pincode}` : ""}
                    </>
                  ) : (
                    <span className="text-sm font-normal text-gray-400">
                      Address not available
                    </span>
                  )}
                </p>

              </div>
            </div>
          </div>

          {/* MAP IMAGE */}
          <div className="w-full mt-10">
            <img
              src={mapimage}
              className="w-full rounded shadow-lg"
              alt="Map Location"
            />
          </div>

        </div>
      </div>
    </PageAnimation>
  );
}