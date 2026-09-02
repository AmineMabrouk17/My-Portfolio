import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { Flip } from "gsap/Flip"
import { Observer } from "gsap/Observer"
import { CustomEase } from "gsap/CustomEase"
import { CustomWiggle } from "gsap/CustomWiggle"

gsap.registerPlugin(ScrollTrigger, SplitText, Flip, Observer, CustomEase, CustomWiggle)

export { gsap, ScrollTrigger, SplitText, Flip, Observer, CustomEase, CustomWiggle }
