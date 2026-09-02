import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { Flip } from "gsap/Flip"
import { Observer } from "gsap/Observer"
import { CustomWiggle } from "gsap/CustomWiggle"

gsap.registerPlugin(ScrollTrigger, SplitText, Flip, Observer, CustomWiggle)

export { gsap, ScrollTrigger, SplitText, Flip, Observer, CustomWiggle }
