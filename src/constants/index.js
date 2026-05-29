import { livemedica, shiash, meta, shopify, starbucks, tesla } from "../assets/images";
import {
    car, contact, css, estate, express, git, github, html,
    javascript, linkedin, mongodb, motion, mui, nextjs, nodejs,
    pricewise, react, redux, sass, snapgram, summiz, tailwindcss,
    threads, typescript,
    /* ecosystem icons */
    python, cplusplus, java, docker, kubernetes, pytorch, tensorflow,
    fastapi, postgresql, redis, springboot, kotlin, mysql, aws, kafka,
    opencv, jupyter, pandas, numpy, flask, django, rabbitmq, nginx,
    linux, cmake, github_actions, firebase, graphql, android, boost,
    qt, curl, vcpkg, dcmtk, rapidjson, itk, onnx,
} from "../assets/icons";

/* ─── 3D flip-block icons (About page) ─────────────────────────────── */
export const skills = [
    /* Languages */
    { imageUrl: python,      name: "Python",         type: "Language"         },
    { imageUrl: cplusplus,   name: "C++",            type: "Language"         },
    { imageUrl: java,        name: "Java",           type: "Language"         },
    { imageUrl: javascript,  name: "JavaScript",     type: "Language"         },
    { imageUrl: typescript,  name: "TypeScript",     type: "Language"         },
    { imageUrl: kotlin,      name: "Kotlin",         type: "Language"         },

    /* AI / ML */
    { imageUrl: pytorch,     name: "PyTorch",        type: "AI/ML"            },
    { imageUrl: tensorflow,  name: "TensorFlow",     type: "AI/ML"            },
    { imageUrl: jupyter,     name: "Jupyter",        type: "AI/ML"            },
    { imageUrl: pandas,      name: "Pandas",         type: "AI/ML"            },
    { imageUrl: numpy,       name: "NumPy",          type: "AI/ML"            },

    /* C++ Ecosystem */
    { imageUrl: cmake,       name: "CMake",          type: "C++ Ecosystem"    },
    { imageUrl: boost,       name: "Boost",          type: "C++ Ecosystem"    },
    { imageUrl: opencv,      name: "OpenCV",         type: "C++ Ecosystem"    },
    { imageUrl: dcmtk,       name: "DCMTK",          type: "C++ Ecosystem"    },
    { imageUrl: itk,         name: "ITK",            type: "C++ Ecosystem"    },
    { imageUrl: rapidjson,   name: "RapidJSON",      type: "C++ Ecosystem"    },
    { imageUrl: curl,        name: "libcurl",        type: "C++ Ecosystem"    },
    { imageUrl: vcpkg,       name: "vcpkg",          type: "C++ Ecosystem"    },
    { imageUrl: onnx,        name: "ONNX Runtime",   type: "C++ Ecosystem"    },
    { imageUrl: qt,          name: "Qt",             type: "C++ Ecosystem"    },

    /* Backend / Full Stack */
    { imageUrl: springboot,  name: "Spring Boot",    type: "Backend"          },
    { imageUrl: nodejs,      name: "Node.js",        type: "Backend"          },
    { imageUrl: fastapi,     name: "FastAPI",        type: "Backend"          },
    { imageUrl: flask,       name: "Flask",          type: "Backend"          },
    { imageUrl: django,      name: "Django",         type: "Backend"          },
    { imageUrl: graphql,     name: "GraphQL",        type: "Backend"          },
    { imageUrl: express,     name: "Express",        type: "Backend"          },

    /* Frontend */
    { imageUrl: react,       name: "React",          type: "Frontend"         },
    { imageUrl: nextjs,      name: "Next.js",        type: "Frontend"         },
    { imageUrl: tailwindcss, name: "Tailwind CSS",   type: "Frontend"         },
    { imageUrl: redux,       name: "Redux",          type: "Frontend"         },
    { imageUrl: html,        name: "HTML",           type: "Frontend"         },
    { imageUrl: css,         name: "CSS",            type: "Frontend"         },
    { imageUrl: sass,        name: "Sass",           type: "Frontend"         },

    /* Mobile */
    { imageUrl: android,     name: "Android",        type: "Mobile"           },
    { imageUrl: firebase,    name: "Firebase",       type: "Mobile"           },

    /* Databases */
    { imageUrl: mongodb,     name: "MongoDB",        type: "Database"         },
    { imageUrl: postgresql,  name: "PostgreSQL",     type: "Database"         },
    { imageUrl: mysql,       name: "MySQL",          type: "Database"         },
    { imageUrl: redis,       name: "Redis",          type: "Database"         },

    /* DevOps / Cloud */
    { imageUrl: docker,      name: "Docker",         type: "DevOps"           },
    { imageUrl: kubernetes,  name: "Kubernetes",     type: "DevOps"           },
    { imageUrl: aws,         name: "AWS",            type: "DevOps"           },
    { imageUrl: kafka,       name: "Kafka",          type: "DevOps"           },
    { imageUrl: rabbitmq,    name: "RabbitMQ",       type: "DevOps"           },
    { imageUrl: nginx,       name: "Nginx",          type: "DevOps"           },
    { imageUrl: linux,       name: "Linux",          type: "DevOps"           },
    { imageUrl: github_actions, name: "GitHub Actions", type: "DevOps"        },

    /* Tools & Animation */
    { imageUrl: git,         name: "Git",            type: "Tools"            },
    { imageUrl: github,      name: "GitHub",         type: "Tools"            },
    { imageUrl: motion,      name: "Framer Motion",  type: "Tools"            },
    { imageUrl: mui,         name: "Material-UI",    type: "Tools"            },
];

/* ─── Comprehensive skill categories (About page domain grid) ───────── */
export const skillCategories = [
    {
        category: "Languages",
        color: "#6366f1",
        items: [
            "Python", "C++17/20", "Java", "JavaScript",
            "TypeScript", "Kotlin", "SQL", "C", "Bash",
        ],
    },
    {
        category: "AI / Deep Learning",
        color: "#a78bfa",
        items: [
            "PyTorch", "TensorFlow", "YOLO v8",
            "ONNX Runtime", "Hugging Face Transformers",
            "scikit-learn", "XGBoost", "LightGBM",
            "MLflow", "Weights & Biases",
        ],
    },
    {
        category: "Computer Vision & Medical AI",
        color: "#c084fc",
        items: [
            "OpenCV", "Tesseract OCR", "MONAI",
            "Albumentations", "SimpleITK", "pydicom",
            "nibabel", "Pillow", "ITK / VTK",
            "DCMTK", "Intel IPP",
        ],
    },
    {
        category: "C++ Ecosystem",
        color: "#34d399",
        items: [
            "Boost.Asio", "Boost.Beast", "Boost.Thread",
            "gRPC / Protobuf", "libcurl", "RapidJSON",
            "nlohmann/json", "CMake", "vcpkg", "Conan",
            "GTest / Catch2", "Valgrind", "AddressSanitizer",
        ],
    },
    {
        category: "Medical Imaging (PACS/HL7)",
        color: "#2dd4bf",
        items: [
            "DICOM", "HL7 v2.x (ORM/SIU/MDM/ADT)",
            "FHIR", "Mirth Connect", "DCMTK",
            "ITK", "GDCM", "PACS / RIS",
            "Intel IPP", "Intel TBB",
        ],
    },
    {
        category: "Backend & APIs",
        color: "#60a5fa",
        items: [
            "Spring Boot", "Node.js / Express",
            "FastAPI", "Flask", "Django REST",
            "gRPC", "GraphQL", "REST API",
            "Hibernate / JPA", "WebSocket",
        ],
    },
    {
        category: "Message Queues & Streaming",
        color: "#f97316",
        items: [
            "Apache Kafka", "RabbitMQ",
            "Redis Pub/Sub", "WebSocket",
            "Socket.io", "ZeroMQ",
            "Event-driven Architecture",
        ],
    },
    {
        category: "Python Data Science",
        color: "#fbbf24",
        items: [
            "NumPy", "Pandas", "Polars",
            "Matplotlib", "Seaborn", "Plotly",
            "SciPy", "Pydantic", "Celery",
            "pytest", "Jupyter",
        ],
    },
    {
        category: "Databases",
        color: "#fb7185",
        items: [
            "PostgreSQL", "MySQL", "MongoDB",
            "Redis", "SQLite", "Firebase Firestore",
            "Elasticsearch", "SQLAlchemy",
        ],
    },
    {
        category: "Frontend",
        color: "#38bdf8",
        items: [
            "React.js", "Next.js", "TypeScript",
            "Tailwind CSS", "Bootstrap", "SASS",
            "Redux / Zustand", "Framer Motion",
            "HTML5", "CSS3",
        ],
    },
    {
        category: "Android",
        color: "#4ade80",
        items: [
            "Android SDK", "Java / Kotlin",
            "Jetpack Compose", "Coroutines",
            "Google ML Kit", "Tesseract OCR",
            "Room DB", "Retrofit", "Firebase",
        ],
    },
    {
        category: "DevOps & Cloud",
        color: "#f472b6",
        items: [
            "Docker", "Kubernetes",
            "AWS EC2 / S3 / ECR", "GitHub Actions",
            "Jenkins", "Nginx", "OpenResty",
            "Linux", "Bash scripting",
        ],
    },
];

/* ─── Work Experience (About page vertical timeline) ───────────────── */
export const experiences = [
    {
        title: "Backend Software Engineer",
        company_name: "Live Medica Intelligence",
        icon: livemedica,
        iconBg: "#0f172a",
        date: "Jul 2024 – Present",
        points: [
            "Identified that sequential DICOM image retrieval was the critical bottleneck in the PACS pipeline — redesigned the pixel data path using DCMTK DcmPixelData with Intel IPP for zero-copy windowing, LUT transforms, and CLAHE on 12/16-bit CT/MRI frames, eliminating 200–400 ms per-frame spikes and achieving a 40% end-to-end latency reduction across multi-frame DICOM series.",
            "Solved the dual-write consistency problem between DICOM storage and HL7 event publication using the Transactional Outbox Pattern — writing DICOM study records and routing events atomically to PostgreSQL, with a Kafka Debezium CDC connector guaranteeing at-least-once delivery; idempotent consumers on the subscriber side achieved exactly-once processing semantics across millions of daily healthcare messages.",
            "Diagnosed persistent HL7 message loss between HIS, RIS, and PACS caused by fire-and-forget MLLP delivery — re-architected the integration layer using Mirth Connect channels with custom JavaScript transformers for HL7 v2.x (ORM^O01, SIU^S12, MDM^T02, ADT^A01–A40) to FHIR R4 conversion, RabbitMQ dead-letter queues for retry logic, and Redis as an idempotency key store, reducing message failure rate from 6% to near zero.",
            "Addressed multi-tenant request isolation and security gaps by deploying Nginx/OpenResty with Lua scripting for per-tenant JWT validation at the edge, token-bucket rate limiting backed by shared Redis, mTLS for inter-service communication, and gzip/Brotli compression — sustaining 99.9% ingress uptime across a fleet of Docker-containerized healthcare microservices.",
            "Removed the Python runtime dependency from the production AI inference path by building an end-to-end MLOps pipeline: PyTorch YOLO v8 model trained on annotated DICOM spine datasets → ONNX export with INT8 quantization → ONNX Runtime C++ API with Boost.Asio async request queuing — delivering sub-100 ms per-frame inference latency and enabling direct integration with the DCMTK-based PACS C++ backend.",
            "Defined Protobuf v3 schemas for 12+ healthcare domain services (DicomStore, WorklistService, HL7Router, InferenceService) with backward-compatible evolution rules — enforcing strict API contracts between C++ backend services and the Java Spring Boot API gateway via gRPC bidirectional streaming, enabling zero-downtime independent deployability of each microservice.",
        ],
    },
    {
        title: "Java Full Stack Developer Intern",
        company_name: "Shiash Info Tech",
        icon: shiash,
        iconBg: "#0f172a",
        date: "Apr 2024 – Jul 2024",
        points: [
            "Identified N+1 query patterns in Hibernate ORM causing 800 ms+ API response times on the product listing endpoint — replaced lazy-loaded associations with JOIN FETCH queries, added composite indexes on (category, price, stock_status), and tuned HikariCP connection pool to 20 max connections, cutting average API latency by 30% under concurrent load.",
            "Built a multi-module Spring Boot e-commerce platform with dedicated services for product catalog, cart, order management, and payment — exposing RESTful APIs consumed by a Thymeleaf + Bootstrap 5 frontend with AJAX-driven infinite scroll pagination and real-time cart total updates without page reload.",
            "Solved session fixation and privilege escalation risks by implementing role-based access control (RBAC) with Spring Security — JWT-based stateless authentication, BCrypt password hashing, method-level @PreAuthorize annotations for ADMIN/VENDOR/CUSTOMER roles, CSRF protection on all state-mutating endpoints, and forced session invalidation on password change.",
            "Deployed the full application stack on AWS EC2 (t3.medium) using Docker containers behind Apache Tomcat with an Nginx reverse proxy for SSL termination and gzip compression — configured automated EC2 AMI snapshots for disaster recovery and EC2 Auto Scaling group policies for traffic spikes.",
        ],
    },
];

/* ─── BentoGrid cells (Projects /about section) ────────────────────── */
export const gridItems = [
    {
        id: 1,
        title: "I build systems that scale, models that think, code that matters.",
        description: "",
        className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
        imgClassName: "w-full h-full",
        titleClassName: "justify-end",
        img: "/b1.svg",
        spareImg: "",
    },
    {
        id: 2,
        title: "Available across IST, CST and EST time zones",
        description: "",
        className: "lg:col-span-2 md:col-span-3 md:row-span-2",
        imgClassName: "",
        titleClassName: "justify-start",
        img: "",
        spareImg: "",
    },
    {
        id: 3,
        title: "My tech stack",
        description: "I constantly try to improve",
        className: "lg:col-span-2 md:col-span-3 md:row-span-2",
        imgClassName: "",
        titleClassName: "justify-center",
        img: "",
        spareImg: "",
    },
    {
        id: 4,
        title: "AI/ML Engineer passionate about healthcare tech and high-performance systems.",
        description: "",
        className: "lg:col-span-2 md:col-span-3 md:row-span-1",
        imgClassName: "",
        titleClassName: "justify-start",
        img: "/grid.svg",
        spareImg: "/b4.svg",
    },
    {
        id: 5,
        title: "Currently building medical AI inference pipelines",
        description: "The Inside Scoop",
        className: "md:col-span-3 md:row-span-2",
        imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
        titleClassName: "justify-center md:justify-start lg:justify-center",
        img: "/b5.svg",
        spareImg: "/grid.svg",
    },
    {
        id: 6,
        title: "Do you want to start a project together?",
        description: "",
        className: "lg:col-span-2 md:col-span-3 md:row-span-1",
        imgClassName: "",
        titleClassName: "justify-center md:max-w-full max-w-60 text-center",
        img: "",
        spareImg: "",
    },
];

/* ─── Testimonials ──────────────────────────────────────────────────── */
export const testimonials = [
    {
        quote: "Baskaran's ability to bridge AI/ML research and production-grade C++ systems is rare. He delivered our medical imaging pipeline on time with exceptional accuracy — a true engineer who understands the full stack from hardware to UI.",
        name: "Dr. Rajesh Kumar",
        title: "Chief Medical Officer, Healthcare Systems Ltd",
    },
    {
        quote: "Working with Baskaran on our HL7 messaging infrastructure was outstanding. His deep knowledge of Kafka, gRPC, and Mirth Connect transformed our data pipeline's reliability from 94% to 99.9% uptime.",
        name: "Priya Shankar",
        title: "CTO, MedTech Innovations",
    },
    {
        quote: "Baskaran built our Android OCR app with incredible attention to accuracy and performance. The Tesseract integration with OpenCV preprocessing exceeded our expectations. Highly recommend for any AI-powered mobile project.",
        name: "Arjun Nair",
        title: "Product Lead, DocuScan Technologies",
    },
];

/* ─── Tech company logos (dark portfolio) ───────────────────────────── */
export const companies = [
    { id: 1, name: "Cloudinary", img: "/cloud.svg",  nameImg: "/cloudName.svg"  },
    { id: 2, name: "Appwrite",   img: "/app.svg",    nameImg: "/appName.svg"    },
    { id: 3, name: "Hostinger",  img: "/host.svg",   nameImg: "/hostName.svg"   },
    { id: 4, name: "Stream",     img: "/s.svg",      nameImg: "/streamName.svg" },
    { id: 5, name: "Docker",     img: "/dock.svg",   nameImg: "/dockerName.svg" },
];

/* ─── Experience cards (dark portfolio) ────────────────────────────── */
export const workExperience = [
    {
        id: 1,
        title: "Backend Software Engineer — Live Medica",
        desc: "PACS/DICOM backend: DCMTK, ITK, Intel IPP — 40% latency reduction. HL7 pipelines handling millions of messages via Kafka, RabbitMQ, gRPC, and Nginx/OpenResty.",
        className: "md:col-span-2",
        thumbnail: "/exp1.svg",
    },
    {
        id: 2,
        title: "AI/ML Engineer — Medical Imaging",
        desc: "Trained YOLO on annotated DICOM datasets for spine region detection. Deployed ONNX C++ inference service with Boost.Asio async I/O and RapidJSON parsing.",
        className: "md:col-span-2",
        thumbnail: "/exp2.svg",
    },
    {
        id: 3,
        title: "Java Full Stack Developer Intern",
        desc: "Spring Boot e-commerce platform — Hibernate ORM, Spring Security, MySQL, AWS EC2 via Tomcat. 30% page-load reduction through query optimisation.",
        className: "md:col-span-2",
        thumbnail: "/exp3.svg",
    },
    {
        id: 4,
        title: "Android AI Developer",
        desc: "On-device OCR Android app: Tesseract + OpenCV preprocessing + Google ML Kit layout detection. 95%+ accuracy on printed and semi-handwritten medical documents.",
        className: "md:col-span-2",
        thumbnail: "/exp4.svg",
    },
];

/* ─── Social media links ─────────────────────────────────────────────── */
export const socialMedia = [
    { id: 1, img: "/git.svg",  link: "https://github.com/baskaran0708" },
    { id: 2, img: "/link.svg", link: "https://www.linkedin.com/in/baskaran-a-b6757625a/" },
];

export const socialLinks = [
    { name: "Contact",  iconUrl: contact,  link: "/contact" },
    { name: "GitHub",   iconUrl: github,   link: "https://github.com/baskaran0708" },
    { name: "LinkedIn", iconUrl: linkedin, link: "https://www.linkedin.com/in/baskaran-a-b6757625a/" },
];

/* ─── Projects (dark portfolio pin cards) ───────────────────────────── */
export const projects = [
    {
        iconUrl: pricewise,
        img: "/p1.svg",
        iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/fm.svg"],
        theme: "btn-back-red",
        name: "HL7 Healthcare Messaging System",
        description: "High-throughput pipeline processing millions of HL7 v2.x messages (ORM, SIU, MDM, ADT) using Kafka, RabbitMQ, gRPC, Mirth Connect, and Spring Boot microservices — 99.9% uptime.",
        link: "https://github.com/baskaran0708",
    },
    {
        iconUrl: threads,
        img: "/p2.svg",
        iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/c.svg"],
        theme: "btn-back-green",
        name: "Medical Spine Region Detection",
        description: "Custom YOLO deep learning model on annotated DICOM datasets for vertebral segmentation. C++ ONNX inference service using DCMTK, OpenCV, RapidJSON, and Boost.Asio.",
        link: "https://github.com/baskaran0708",
    },
    {
        iconUrl: car,
        img: "/p3.svg",
        iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/c.svg"],
        theme: "btn-back-blue",
        name: "PACS Backend with DICOM Viewer",
        description: "Scalable PACS backend using DCMTK, ITK, OpenCV, and Intel IPP — 40% latency reduction. gRPC microservices, Redis caching, Kafka streaming, Nginx/OpenResty on AWS.",
        link: "https://github.com/baskaran0708",
    },
    {
        iconUrl: snapgram,
        img: "/p4.svg",
        iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/fm.svg"],
        theme: "btn-back-pink",
        name: "Android AI OCR Engine",
        description: "Android app integrating Tesseract OCR with OpenCV preprocessing (binarisation, deskew, noise removal) and Google ML Kit layout detection — 95%+ accuracy on medical documents.",
        link: "https://github.com/baskaran0708",
    },
    {
        iconUrl: estate,
        img: "/p1.svg",
        iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/gsap.svg"],
        theme: "btn-back-black",
        name: "AI Trip Planner",
        description: "Full-stack AI travel assistant generating personalised day-wise itineraries using Gemini AI. Firebase Auth & Firestore, React.js + Vite frontend — 90% reduction in manual planning time.",
        link: "https://github.com/baskaran0708",
    },
    {
        iconUrl: summiz,
        img: "/p2.svg",
        iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/c.svg"],
        theme: "btn-back-yellow",
        name: "C++ High-Performance Backend",
        description: "Performance-critical imaging backend: Boost.Asio async networking, libcurl HTTPS, RapidJSON zero-copy parsing, DCMTK DICOM compliance. Validated with Valgrind + AddressSanitizer.",
        link: "https://github.com/baskaran0708",
    },
];
