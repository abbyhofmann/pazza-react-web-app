import { markDiscussionResolved, markDiscussionUnresolved } from "../services/followupDiscussionService";

const useResolvedButtons = (
    fudId: string,
    setResolved: (resolvedState: boolean) => void
) => {

    const handleClickResolve = async () => {
        try {
            await markDiscussionResolved(fudId);
            setResolved(true);
        } catch (error) {
            console.error("Error updating discussion resolved:", error);
        }
    }

    const handleClickUnresolve = async () => {
        try {
            await markDiscussionUnresolved(fudId);
            setResolved(false);
        } catch (error) {
            console.error("Error marking discussion unresolved:", error);
        }
    }

    return {
        handleClickResolve,
        handleClickUnresolve
    }
}

export default useResolvedButtons; 