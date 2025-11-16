import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";
import mapimage from '../assets/mapimage.jpg'

export default function Contact() {
    const mainColor = "#009E66";

    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load contact info
    const loadContact = async () => {
        try {
            const res = await api.get("/contact");
            setContact(res.data || {});
        } catch (err) {
            console.error("Contact Load Error:", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadContact();
    }, []);

    if (loading) return <div className="p-10 text-xl text-center">Loading...</div>;

    return (
        <div className="flex flex-col items-center w-full">
            <Navbar />

            <h1 className="text-4xl font-semibold text-center mt-10 mb-12 py-2 px-10 border-2 border-[#009e66] text-[#009E66] w-fit">
                Contact
            </h1>

            {/* MAIN CONTENT */}
            <div className="w-full max-w-6xl px-6">

                {/* TOP SECTION */}
                <div className="flex flex-col items-start gap-10 md:flex-row">

                    {/* LEFT PHOTO */}
                    <div className="flex-shrink-0">
                        <div
                            className="w-40 h-40 mt-8 overflow-hidden border-2 rounded-full"
                            style={{ borderColor: mainColor }}
                        >
                            <img
                                src={contact.photoUrl || "https://via.placeholder.com/300"}
                                alt="profile"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>

                    {/* CENTER VERTICAL LINE + TEXT */}
                    <div className="flex gap-4">
                        <div
                            className="hidden md:block w-[2px] h-60 rounded-full"
                            style={{ backgroundColor: mainColor }}
                        ></div>

                        <div className="flex flex-col items-start text-start">
                            <h2 className="text-2xl font-bold">{contact.name}</h2>

                            <p className="text-lg font-semibold">{contact.profession}</p>
                            <p className="text-lg font-semibold">{contact.department}</p>

                            <p className="font-semibold ">
                                Email:{" "}
                                <a
                                    href={`mailto:${contact.emailPrimary}`}
                                    className="text-blue-600 underline"
                                >
                                    {contact.emailPrimary}
                                </a>
                            </p>

                            {contact.emailSecondary && (
                                <a
                                    href={`mailto:${contact.emailSecondary}`}
                                    className="ml-12 font-semibold text-blue-600 underline"
                                >
                                    {contact.emailSecondary}
                                </a>
                            )}


                            <p className="flex flex-col mt-10 text-lg font-semibold leading-relaxed">
                                {contact.addressLine1}, <br />
                                {contact.city}, {contact.state}– {contact.pincode}
                            </p>
                        </div>
                    </div>
                </div>

                {/* HARD CODED MAP IMAGE */}
                <div className="w-full mt-10">
                    <img
                        src={mapimage} // put this image in public/images/map_static.png
                        className="w-full shadow"
                        alt="Map Location"
                    />
                </div>

            </div>
        </div>
    );
}
