const resumeData = {
    about: {
        name: "Tharaneeshwaran V U",
        title: "B.Tech, Computer Science and Engineering",
        email: "eeshwarantharan@gmail.com",
        phone: "+91 9171907755",
        location: "Puducherry, India",
        summary: "Computer Science student with a strong foundation in AI/ML, 3D Vision, and Embedded Systems. Passionate about leveraging technology to solve real-world problems. Currently an exchange student at IIT Madras."
    },
    education: [
        {
            institution: "IIT Madras",
            degree: "B.Tech, Computer Science and Engineering (Student Exchange Programme)",
            duration: "July 2025 – May 2026",
            location: "Chennai, India"
        },
        {
            institution: "NIT Puducherry",
            degree: "B.Tech, Computer Science and Engineering",
            duration: "Nov 2022 – May 2025",
            location: "Karaikal, India",
            details: "CGPA: 9.17"
        },
        {
            institution: "Aditya Vidyashram",
            degree: "Higher Secondary Education",
            duration: "June 2021 – July 2022",
            location: "Puducherry, India",
            details: "Percentage: 91.2%"
        }
    ],
    experience: [
        {
            role: "Summer Intern",
            company: "IIT Madras",
            duration: "May 2025 – July 2025",
            location: "Chennai, India",
            points: [
                "Simulated GNSS and RF signal propagation using NVIDIA Sionna and evaluated SDR tools (GNSS-SDR, HackRF).",
                "Reconstructed indoor 3D environments with COLMAP and Gaussian Splatting to derive visual priors for RF channel modeling.",
                "Advanced hybrid localization research by integrating wireless signal data with 3D geometry-based ray tracing."
            ]
        },
        {
            role: "Research and Development Intern",
            company: "IINVSYS",
            duration: "May 2024 – June 2024",
            location: "Puducherry, India",
            points: [
                "Gained in-depth knowledge of C, embedded systems, and STM32 devices.",
                "Developed a GNSS simulator tool to track satellite orbits, ground paths, and velocity using TCP-based client-server communication.",
                "Developed and tested firmware for WiFi enabled IoT devices."
            ]
        }
    ],
    skills: {
        "AI / ML": ["LangChain", "Hugging Face", "PyTorch", "Scikit-learn", "OpenCV"],
        "3D Vision & Graphics": ["LiDAR", "Gaussian Splatting", "Blender"],
        "Programming": ["Python", "C", "Java", "JavaScript", "Dart", "SQL", "HTML/CSS"],
        "Web & Mobile Dev": ["Flutter", "Firebase", "Streamlit", "Bootstrap"],
        "Tools & Platforms": ["Git", "Docker", "Selenium", "STM32", "NVIDIA Sionna"]
    },
    projects: [
        {
            title: "ARGOS: Leveraging Visual Priors for Scalable Wireless Navigation",
            tags: ["Sionna RT", "COLMAP", "Gaussian Splatting", "UWB"],
            description: "Developed ARGOS, a multimodal wireless digital twin combining visual priors and RF data for adaptive anchor selection and sub-meter indoor localization accuracy."
        },
        {
            title: "Sionna AI Agent - Advanced RAG Developer Assistant",
            tags: ["LangChain", "ChromaDB", "Llama 3", "Gemini", "Streamlit"],
            description: "Developed an open-source RAG agent for NVIDIA Sionna, integrating a dual-LLM backend, multi-vector retrieval pipeline, and a 'Draft & Correct' reasoning framework."
        },
        {
            title: "IRBN Canteen : Puducherry - Mobile App",
            tags: ["Figma", "Flutter", "Firebase"],
            description: "Developed a canteen inventory management app for the Police Department using Firebase with secure authentication and supplier-wise tracking."
        }
    ],
    social: {
        linkedin: "https://www.linkedin.com/in/tharaneeshwaran/", // Placeholder
        github: "https://github.com/eeshwarantharan",   // Placeholder
        leetcode: "https://leetcode.com/u/eeshwarantharan/", // Placeholder
        codechef: "#"  // Placeholder
    }
};
