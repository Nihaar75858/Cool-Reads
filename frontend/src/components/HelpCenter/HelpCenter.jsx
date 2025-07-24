import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../Context/UserContext';

const HelpCenter = () => {
    const { user } = useUser();
    const [formData, setFormData] = useState({
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        // 🔑 Clear submitted + error when user edits:
        if (submitted) setSubmitted(false);
        if (error) setError(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            name: user ? user.firstName + " " + user.lastName : 'Anonymous',
            email: user ? user.email : 'Anonymous',
            userId: user ? user.id : null, // Include user ID if available
        };

        try {
            await axios.post('http://localhost:5000/api/help/', payload);
            setSubmitted(true);
            setFormData({ subject: '', message: '' });
        } catch (err) {
            console.error('Error submitting help request:', err);
        }
    };

    const faqs = [
        {
            question: "How do I publish a book?",
            answer: "Go to your author dashboard, click 'Request Publication', and follow the instructions."
        },
        {
            question: "Can I edit my book after submitting?",
            answer: "You can edit until the admin accepts it for publication. After that, please contact support."
        },
        {
            question: "Is my information kept private?",
            answer: "Yes. We value your privacy and do not share your details without your consent."
        },
        {
            question: "How do I contact an admin?",
            answer: "You can use the form below to reach out directly to our admin team."
        },
    ];

    return (
        <div className="min-h-screen bg-custombg p-8">
            <div className="max-w-4xl mx-auto">

                {/* FAQs */}
                <h1 className="text-5xl font-bold mb-6 text-black text-center">Help Center</h1>

                <section className="mb-10">
                    <h2 className="text-4xl font-semibold mb-4 text-black">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white p-4 rounded shadow">
                                <h3 className="font-bold text-lg text-gray-800">{faq.question}</h3>
                                <p className="text-gray-700 mt-2">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Form */}
                <section>
                    <h2 className="text-4xl font-semibold mb-4 text-black">Contact Us</h2>

                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
                        <div>
                            <label className="block mb-1 font-bold">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-bold">Message</label>
                            <textarea
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Submit Request
                        </button>
                    </form>

                    {/* ✅ Status message shown **below** the form */}
                    {submitted && (
                        <p className="text-green-700 font-semibold mt-4">
                            Thank you! Your request has been sent to the admin.
                        </p>
                    )}

                    {error && (
                        <p className="text-red-600 mt-4">
                            Error submitting form. Please check your network and try again.
                        </p>
                    )}

                </section>
            </div>
        </div>
    );
};

export default HelpCenter;
