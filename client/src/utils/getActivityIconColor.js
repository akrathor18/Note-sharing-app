import {
    BrainCircuit,
    Plus,
    Activity,
    Flame,
    Upload,
    Github,
    Instagram,
    Linkedin,
    Twitter,
    Globe

} from "lucide-react"
const getActivityIcon = (type) => {
    

        switch (type) {
            case "note_upload":
                return Upload
            case "quiz_attempt":
                return BrainCircuit
            case "quiz_created":
                return Plus
            case "streak_milestone":
                return Flame
            default:
                return Activity
        }
    }

    const getActivityColor = (type) => {
        switch (type) {
            case "note_upload":
                return "#FF007F"
            case "quiz_attempt":
                return "#00E5FF"
            case "quiz_created":
                return "#4CAF50"
            case "streak_milestone":
                return "#FF6B35"
            default:
                return "#9E9E9E"
        }
    }

    const getLinksIcon=(type)=>{
    switch(type.toLowerCase()){
        case "github":
            return Github
        case "instagram":
            return Instagram
        case "linkedin":
            return Linkedin
        case "twitter":
        return Twitter
        default:
            return Globe
    }
    }

    export { getActivityIcon, getActivityColor, getLinksIcon };