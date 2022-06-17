import { useAuthContext } from "../context/AuthContext"

export const VerifiEmailPage = () => {
    const { user, handleVerifyEmail, handleOut } = useAuthContext();

    return (
        <section className="section__container">
            <div className="box max-w-xs">
                <div className="flex flex-col gap-3">
                    <h1 className="text-xl font-medium text-black">
                        <span className="text-blue-600">{user.email.split("@")[0]}, </span>
                        <span>please verify your email to continue</span>
                    </h1>
                    <p className="text-sm">
                        When you verify your email reload this page to enter. 
                    </p>
                </div>

                <div className="w-full flex flex-col gap-4">
                    <button 
                        className="button button--primary"
                        onClick={handleVerifyEmail}
                    >
                        Send me email verification
                    </button>
                    <button
                        className="button button--error"
                        onClick={handleOut}
                    >
                        Sign out
                    </button>
                </div> 
            </div>
        </section>
    )
}