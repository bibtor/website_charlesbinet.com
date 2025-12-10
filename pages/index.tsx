import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Linkedin, Dribbble, Github } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isHovered, setIsHovered] = useState(false);
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const [isUncloakHovered, setIsUncloakHovered] = useState(false);
  const [isMinesquadHovered, setIsMinesquadHovered] = useState(false);
  const [isWhalesNestHovered, setIsWhalesNestHovered] = useState(false);
  const [isWorkHovered, setIsWorkHovered] = useState(false);

  // Tooltip states for individual icons
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  // Email interaction states
  const [isEmailRevealed, setIsEmailRevealed] = useState(false);
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const [isEmailHovered, setIsEmailHovered] = useState(false);

  // Work assets cycling states
  const [currentAssetIndex, setCurrentAssetIndex] = useState<{
    [key: string]: number;
  }>({
    depict: 0,
    validio: 0,
    curb: 0,
    zettle: 0,
    daresay: 0,
  });

  // Work assets configuration
  const workAssets = {
    depict: ["depict01.png", "depict02.png", "depict03.png", "depict04.png"],
    validio: ["validio01.png", "validio02.png", "validio03.png"],
    curb: ["curb01.png", "curb02.png", "curb03.png"],
    zettle: ["zettle01.png", "zettle02.png", "zettle03.png", "zettle04.png"],
    daresay: ["daresay01.png", "daresay02.png", "daresay03.png"],
  };

  const handleEmailClick = async () => {
    if (!isDesktop && !isEmailRevealed) {
      // Mobile: first tap reveals email
      setIsEmailRevealed(true);
    } else {
      // Desktop click or mobile second tap: copy to clipboard
      try {
        await navigator.clipboard.writeText("charlesbinet@proton.me");
        setIsEmailCopied(true);
        setTimeout(() => setIsEmailCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy email:", err);
      }
    }
  };

  const handleEmailHover = () => {
    if (isDesktop) {
      setIsEmailRevealed(true);
      setIsEmailHovered(true);
    }
  };

  const handleEmailLeave = () => {
    if (isDesktop) {
      setIsEmailHovered(false);
      setIsEmailRevealed(false);
    }
  };

  // Handle work assets cycling
  useEffect(() => {
    if (!hoveredIcon || !workAssets[hoveredIcon as keyof typeof workAssets])
      return;

    const interval = setInterval(() => {
      setCurrentAssetIndex((prev) => {
        const company = hoveredIcon as keyof typeof workAssets;
        const assetCount = workAssets[company].length;
        return {
          ...prev,
          [company]: (prev[company] + 1) % assetCount,
        };
      });
    }, 800); // Change image every 0.8 seconds

    return () => clearInterval(interval);
  }, [hoveredIcon]);

  const iconVariants = {
    initial: {
      opacity: 0,
    },
    animate: (custom: { rotate: number }) => ({
      opacity: 1,
      rotate: isDesktop ? custom.rotate : 0,
    }),
    hover: {
      rotate: 0,
    },
  };

  const iconTransition = {
    duration: 0.3,
    ease: "easeOut",
  };

  return (
    <main className="min-h-screen bg-light-bg dark:bg-dark-bg text-gray-900 dark:text-white transition-colors duration-300">
      <ThemeToggle />

      <div className="max-w-[640px] mx-auto p-8 min-h-screen flex flex-col justify-center">
        <motion.div
          className="flex flex-col items-start gap-4 sm:flex-row sm:items-center mb-12"
          onHoverStart={() => setIsAvatarHovered(true)}
          onHoverEnd={() => setIsAvatarHovered(false)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.5 }}
        >
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Hi, I'm Charles
          </motion.p>
          <motion.div
            className="w-12 h-12 rounded-full shadow-lg sm:ml-4 relative"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{
              opacity: 1,
              rotate: isAvatarHovered ? 183 : 3,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onHoverStart={() => setHoveredIcon("avatar")}
            onHoverEnd={() => setHoveredIcon(null)}
          >
            <Image
              src="/avatar.jpeg"
              alt="Charles Binet's avatar"
              width={48}
              height={48}
              className="rounded-full"
            />
            {hoveredIcon === "avatar" && (
              <div
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                             bg-dark-bg dark:bg-light-bg text-light-bg dark:text-dark-bg
                             px-2 py-1 rounded text-sm whitespace-nowrap z-10"
              >
                Heyyy!
              </div>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col items-start gap-4 sm:flex-row sm:items-center mb-12 group"
          onHoverStart={() => {
            setIsUncloakHovered(true);
            setIsMinesquadHovered(true);
            setIsWhalesNestHovered(true);
          }}
          onHoverEnd={() => {
            setIsUncloakHovered(false);
            setIsMinesquadHovered(false);
            setIsWhalesNestHovered(false);
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            I'm building stuff
          </motion.p>

          <motion.div
            className="flex items-center"
            variants={{
              animate: {
                transition: { staggerChildren: 0.08, delayChildren: 0.1 },
              },
            }}
            initial="initial"
            animate="animate"
          >
            <motion.a
              href="https://uidb.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl shadow-lg transition-all duration-100 ease-out 
                         mr-1 md:-mr-[3px] md:group-hover:mr-1 relative"
              custom={{ rotate: 2 }}
              variants={iconVariants}
              transition={iconTransition}
              animate={isUncloakHovered ? "hover" : "animate"}
              onHoverStart={() => setHoveredIcon("uidb")}
              onHoverEnd={() => setHoveredIcon(null)}
            >
              <Image
                src="/uidb.png"
                alt="UIDB"
                width={48}
                height={48}
                className="rounded-xl"
              />
              {hoveredIcon === "uidb" && (
                <div
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                               bg-dark-bg dark:bg-light-bg text-light-bg dark:text-dark-bg
                               px-2 py-1 rounded text-sm whitespace-nowrap z-10"
                >
                  UIDB - Design on Code
                </div>
              )}
            </motion.a>

            <motion.a
              href="https://www.minesquad.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl shadow-lg transition-all duration-100 ease-out 
                         mr-1 md:-mr-[3px] md:group-hover:mr-1 relative"
              custom={{ rotate: -3 }}
              variants={iconVariants}
              transition={iconTransition}
              animate={isMinesquadHovered ? "hover" : "animate"}
              onHoverStart={() => setHoveredIcon("minesquad")}
              onHoverEnd={() => setHoveredIcon(null)}
            >
              <Image
                src="/minesquad.png"
                alt="Minesquad"
                width={48}
                height={48}
                className="rounded-xl"
              />
              {hoveredIcon === "minesquad" && (
                <div
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                               bg-dark-bg dark:bg-light-bg text-light-bg dark:text-dark-bg
                               px-2 py-1 rounded text-sm whitespace-nowrap z-10"
                >
                  Minesquad - A giveback game
                </div>
              )}
            </motion.a>

            <motion.a
              href="https://www.whalesnest.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl shadow-lg transition-all duration-100 ease-out
                         ml-1 md:-ml-[3px] md:group-hover:ml-1 relative"
              custom={{ rotate: 2 }}
              variants={iconVariants}
              transition={iconTransition}
              animate={isWhalesNestHovered ? "hover" : "animate"}
              onHoverStart={() => setHoveredIcon("whalesnest")}
              onHoverEnd={() => setHoveredIcon(null)}
            >
              <Image
                src="/whalesnest.png"
                alt="Whale's Nest"
                width={48}
                height={48}
                className="rounded-xl"
              />
              {hoveredIcon === "whalesnest" && (
                <div
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                               bg-dark-bg dark:bg-light-bg text-light-bg dark:text-dark-bg
                               px-2 py-1 rounded text-sm whitespace-nowrap z-10"
                >
                  Whale's Nest - Investor tracking
                </div>
              )}
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col items-start gap-4 sm:flex-row sm:items-center mb-12 group"
          onHoverStart={() => setIsWorkHovered(true)}
          onHoverEnd={() => setIsWorkHovered(false)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            I headed product & design at
          </motion.p>

          <motion.div
            className="flex items-center"
            variants={{
              animate: {
                transition: { staggerChildren: 0.08, delayChildren: 0.1 },
              },
            }}
            initial="initial"
            animate="animate"
          >
            <motion.a
              href="https://depict.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl shadow-lg transition-all duration-100 ease-out 
                         mr-1 md:-mr-[3px] md:group-hover:mr-1 relative"
              custom={{ rotate: 4 }}
              variants={iconVariants}
              transition={iconTransition}
              animate={isWorkHovered ? "hover" : "animate"}
              onHoverStart={() => setHoveredIcon("depict")}
              onHoverEnd={() => setHoveredIcon(null)}
            >
              <Image
                src="/depict.jpg"
                alt="Depict"
                width={48}
                height={48}
                className="rounded-xl"
              />
              {hoveredIcon === "depict" && (
                <div
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                               bg-dark-bg dark:bg-light-bg text-light-bg dark:text-dark-bg
                               px-2 py-1 rounded text-sm whitespace-nowrap z-10"
                >
                  Depict AI
                </div>
              )}
              {hoveredIcon === "depict" && workAssets.depict && (
                <motion.div
                  className="absolute top-full mt-2 pointer-events-none z-20 w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] lg:w-[400px] lg:h-[400px]"
                  style={{
                    left: 0,
                    transform: "translateX(-100%)", // Align top-right of asset with bottom-left of icon
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={`/${workAssets.depict[currentAssetIndex.depict]}`}
                    alt="Depict work"
                    width={320}
                    height={320}
                    className="rounded-xl shadow-lg w-full h-full"
                    style={{
                      objectFit: "contain",
                      aspectRatio: "1/1",
                      backgroundColor: "transparent",
                    }}
                  />
                </motion.div>
              )}
            </motion.a>

            <motion.a
              href="https://validio.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl shadow-lg transition-all duration-100 ease-out
                         mx-1 md:-mx-[3px] md:group-hover:mx-1 relative"
              custom={{ rotate: -2 }}
              variants={iconVariants}
              transition={iconTransition}
              animate={isWorkHovered ? "hover" : "animate"}
              onHoverStart={() => setHoveredIcon("validio")}
              onHoverEnd={() => setHoveredIcon(null)}
            >
              <Image
                src="/validio.png"
                alt="Validio"
                width={48}
                height={48}
                className="rounded-xl"
              />
              {hoveredIcon === "validio" && (
                <div
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                               bg-dark-bg dark:bg-light-bg text-light-bg dark:text-dark-bg
                               px-2 py-1 rounded text-sm whitespace-nowrap z-10"
                >
                  Validio
                </div>
              )}
              {hoveredIcon === "validio" && workAssets.validio && (
                <motion.div
                  className="absolute top-full mt-2 pointer-events-none z-20 w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] lg:w-[400px] lg:h-[400px]"
                  style={{
                    left: 0,
                    transform: "translateX(-100%)", // Align top-right of asset with bottom-left of icon
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={`/${workAssets.validio[currentAssetIndex.validio]}`}
                    alt="Validio work"
                    width={320}
                    height={320}
                    className="rounded-xl shadow-lg w-full h-full"
                    style={{
                      objectFit: "contain",
                      aspectRatio: "1/1",
                      backgroundColor: "transparent",
                    }}
                  />
                </motion.div>
              )}
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/company/curb-food/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-100 ease-out
                         mx-1 md:-mx-[3px] md:group-hover:mx-1 relative"
              style={{ backgroundColor: "#CE4129" }}
              custom={{ rotate: -3 }}
              variants={iconVariants}
              transition={iconTransition}
              animate={isWorkHovered ? "hover" : "animate"}
              onHoverStart={() => setHoveredIcon("curb")}
              onHoverEnd={() => setHoveredIcon(null)}
            >
              <Image
                src="/curb.png"
                alt="Curb"
                width={32}
                height={32}
                className="rounded-xl"
              />
              {hoveredIcon === "curb" && (
                <div
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                               bg-dark-bg dark:bg-light-bg text-light-bg dark:text-dark-bg
                               px-2 py-1 rounded text-sm whitespace-nowrap z-10"
                >
                  Curb Food
                </div>
              )}
              {hoveredIcon === "curb" && workAssets.curb && (
                <motion.div
                  className="absolute top-full mt-2 pointer-events-none z-20 w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] lg:w-[400px] lg:h-[400px]"
                  style={{
                    left: 0,
                    transform: "translateX(-100%)", // Align top-right of asset with bottom-left of icon
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={`/${workAssets.curb[currentAssetIndex.curb]}`}
                    alt="Curb work"
                    width={320}
                    height={320}
                    className="rounded-xl shadow-lg w-full h-full"
                    style={{
                      objectFit: "contain",
                      aspectRatio: "1/1",
                      backgroundColor: "transparent",
                    }}
                  />
                </motion.div>
              )}
            </motion.a>

            <motion.a
              href="https://www.zettle.com/se"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl shadow-lg transition-all duration-100 ease-out
                         mx-1 md:-mx-[3px] md:group-hover:mx-1 relative"
              custom={{ rotate: 2 }}
              variants={iconVariants}
              transition={iconTransition}
              animate={isWorkHovered ? "hover" : "animate"}
              onHoverStart={() => setHoveredIcon("zettle")}
              onHoverEnd={() => setHoveredIcon(null)}
            >
              <Image
                src="/zettle.png"
                alt="Zettle"
                width={48}
                height={48}
                className="rounded-xl"
              />
              {hoveredIcon === "zettle" && (
                <div
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                               bg-dark-bg dark:bg-light-bg text-light-bg dark:text-dark-bg
                               px-2 py-1 rounded text-sm whitespace-nowrap z-10"
                >
                  Zettle by PayPal
                </div>
              )}
              {hoveredIcon === "zettle" && workAssets.zettle && (
                <motion.div
                  className="absolute top-full mt-2 pointer-events-none z-20 w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] lg:w-[400px] lg:h-[400px]"
                  style={{
                    left: 0,
                    transform: "translateX(-100%)", // Align top-right of asset with bottom-left of icon
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={`/${workAssets.zettle[currentAssetIndex.zettle]}`}
                    alt="Zettle work"
                    width={320}
                    height={320}
                    className="rounded-xl shadow-lg w-full h-full"
                    style={{
                      objectFit: "contain",
                      aspectRatio: "1/1",
                      backgroundColor: "transparent",
                    }}
                  />
                </motion.div>
              )}
            </motion.a>

            <motion.a
              href="https://daresay.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-100 ease-out
                         ml-1 md:-ml-[3px] md:group-hover:ml-1 relative"
              style={{ backgroundColor: "#000000" }}
              custom={{ rotate: -1 }}
              variants={iconVariants}
              transition={iconTransition}
              animate={isWorkHovered ? "hover" : "animate"}
              onHoverStart={() => setHoveredIcon("daresay")}
              onHoverEnd={() => setHoveredIcon(null)}
            >
              <Image
                src="/daresay.png"
                alt="Daresay"
                width={22}
                height={22}
                style={{ filter: "invert(1)" }}
              />
              {hoveredIcon === "daresay" && (
                <div
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                               bg-dark-bg dark:bg-light-bg text-light-bg dark:text-dark-bg
                               px-2 py-1 rounded text-sm whitespace-nowrap z-10"
                >
                  Daresay
                </div>
              )}
              {hoveredIcon === "daresay" && workAssets.daresay && (
                <motion.div
                  className="absolute top-full mt-2 pointer-events-none z-20 w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] lg:w-[400px] lg:h-[400px]"
                  style={{
                    left: 0,
                    transform: "translateX(-100%)", // Align top-right of asset with bottom-left of icon
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={`/${workAssets.daresay[currentAssetIndex.daresay]}`}
                    alt="Daresay work"
                    width={320}
                    height={320}
                    className="rounded-xl shadow-lg w-full h-full"
                    style={{
                      objectFit: "contain",
                      aspectRatio: "1/1",
                      backgroundColor: "transparent",
                    }}
                  />
                </motion.div>
              )}
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col items-start gap-4 sm:flex-row sm:items-center group"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Find me here
          </motion.p>

          <motion.div
            className="flex items-center"
            variants={{
              animate: {
                transition: { staggerChildren: 0.08, delayChildren: 0.1 },
              },
            }}
            initial="initial"
            animate="animate"
          >
            <motion.a
              href="https://www.linkedin.com/in/charles-binet/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-100 ease-out 
                         mr-1 md:-mr-[3px] md:group-hover:mr-1 relative"
              style={{ backgroundColor: "#0B66C2" }}
              custom={{ rotate: -3 }}
              variants={iconVariants}
              transition={iconTransition}
              animate={isHovered ? "hover" : "animate"}
              onHoverStart={() => setHoveredIcon("linkedin")}
              onHoverEnd={() => setHoveredIcon(null)}
            >
              <Linkedin className="w-6 h-6 text-white" />
              {hoveredIcon === "linkedin" && (
                <div
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                               bg-dark-bg dark:bg-light-bg text-light-bg dark:text-dark-bg
                               px-2 py-1 rounded text-sm whitespace-nowrap z-10"
                >
                  @charles-binet
                </div>
              )}
            </motion.a>

            <motion.a
              href="https://dribbble.com/charles_b"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-100 ease-out
                         mx-1 md:-mx-[3px] md:group-hover:mx-1 relative"
              style={{ backgroundColor: "#EA4C89" }}
              custom={{ rotate: 4 }}
              variants={iconVariants}
              transition={iconTransition}
              animate={isHovered ? "hover" : "animate"}
              onHoverStart={() => setHoveredIcon("dribbble")}
              onHoverEnd={() => setHoveredIcon(null)}
            >
              <Dribbble className="w-6 h-6 text-white" />
              {hoveredIcon === "dribbble" && (
                <div
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                               bg-dark-bg dark:bg-light-bg text-light-bg dark:text-dark-bg
                               px-2 py-1 rounded text-sm whitespace-nowrap z-10"
                >
                  @charles_b
                </div>
              )}
            </motion.a>

            <motion.a
              href="https://github.com/bibtor"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-100 ease-out
                         ml-1 md:-ml-[3px] md:group-hover:ml-1 relative"
              style={{ backgroundColor: "#5C6BC0" }}
              custom={{ rotate: -2 }}
              variants={iconVariants}
              transition={iconTransition}
              animate={isHovered ? "hover" : "animate"}
              onHoverStart={() => setHoveredIcon("github")}
              onHoverEnd={() => setHoveredIcon(null)}
            >
              <Github className="w-6 h-6 text-white" />
              {hoveredIcon === "github" && (
                <div
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                               bg-dark-bg dark:bg-light-bg text-light-bg dark:text-dark-bg
                               px-2 py-1 rounded text-sm whitespace-nowrap z-10"
                >
                  @bibtor
                </div>
              )}
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Line divider */}
        <motion.div
          className="w-full mt-16 mb-8 ml-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <svg
            width="100%"
            height="2"
            viewBox="0 0 1000 2"
            preserveAspectRatio="none"
            className="block"
          >
            <path
              d="M 0 1 L 1000 1"
              stroke="#75777A"
              strokeWidth="1"
              strokeDasharray="8 16"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </motion.div>

        {/* Coaching text */}
        <motion.p
          className="text-lg"
          style={{ color: "#75777A" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          You need coaching to level up your design career?{" "}
          <a
            href="https://adplist.org/mentors/charles-binet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black dark:text-white hover:underline transition-all duration-200"
          >
            Book me here
          </a>
        </motion.p>

        {/* Advising text */}
        <motion.p
          className="text-lg mt-4"
          style={{ color: "#75777A" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.5 }}
        >
          You need product or design advising for your company?{" "}
          <button
            onClick={handleEmailClick}
            onMouseEnter={handleEmailHover}
            onMouseLeave={handleEmailLeave}
            className="text-black dark:text-white hover:underline transition-all duration-200 cursor-pointer bg-transparent border-none p-0 relative"
          >
            {isEmailRevealed ? "charlesbinet@proton.me" : "Click here"}
            {isEmailCopied && (
              <div
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                             bg-dark-bg dark:bg-light-bg text-light-bg dark:text-dark-bg
                             px-2 py-1 rounded text-sm whitespace-nowrap z-10"
              >
                Copied to clipboard!
              </div>
            )}
          </button>
        </motion.p>

        {/* Chat text */}
        <motion.p
          className="text-lg mt-4"
          style={{ color: "#75777A" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          Just want to chat?{" "}
          <a
            href="https://x.com/CharlesTenib"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black dark:text-white hover:underline transition-all duration-200"
          >
            DM me here
          </a>
        </motion.p>
      </div>
    </main>
  );
}
