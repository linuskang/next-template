"use client";

export function Footer() {
    return (
        <footer className="relative border-t border-border bg-card py-3 text-center text-sm text-muted-foreground">
            <div>
                © {new Date().getFullYear()}{' '}
                <a
                    href="https://github.com/linuskang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-white-600 dark:text-white-400 hover:underline underline-offset-2"
                >
                    Linus Kang
                </a>
                
                {" | "}

                <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-white-600 dark:text-white-400 hover:underline underline-offset-2"
                >
                    Privacy Policy
                </a>

                {" | "}
                
                <a
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-white-600 dark:text-white-400 hover:underline underline-offset-2"
                >
                    Terms of Service
                </a>
            </div>
        </footer>
    );
}