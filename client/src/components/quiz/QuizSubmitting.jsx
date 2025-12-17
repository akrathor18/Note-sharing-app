import { Loader2, CheckCircle } from 'lucide-react';

export default function QuizSubmitting() {
    return (
        <div className="max-w-md mx-auto text-center py-24">
            <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#00E5FF]/10 flex items-center justify-center">
                    <Loader2
                        size={32}
                        className="text-[#00E5FF] animate-spin"
                    />
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-2">
                Submitting your answers
            </h2>

            <p className="text-[#F5F5F5]/60">
                Please wait while we evaluate your responses.
                Don’t refresh or close this page.
            </p>

            {/* Optional reassurance */}
            <div className="flex justify-center gap-2 mt-6 text-sm text-[#F5F5F5]/40">
                <CheckCircle size={16} />
                Your progress is being saved
            </div>
        </div>
    );
}
