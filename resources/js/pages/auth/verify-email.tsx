// Components
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { logout } from '@/routes';
import { send } from '@/routes/verification';
import { Form, Head } from '@inertiajs/react';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <AuthLayout
            title="Verifikasi Email"
            description="Klik tautan yang sudah kami kirim ke email Anda untuk mengaktifkan akun."
        >
            <Head title="Verifikasi email" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-[#0f6b4f]">
                    Tautan verifikasi baru sudah dikirim ke email Anda.
                </div>
            )}

            <Form {...send.form()} className="space-y-6 text-center">
                {({ processing }) => (
                    <>
                        <Button
                            disabled={processing}
                            className="w-full rounded-full bg-[#0f6b4f] text-white shadow-[0_10px_24px_rgba(15,107,79,0.2)] hover:brightness-95"
                        >
                            {processing && <Spinner />}
                            Kirim ulang verifikasi
                        </Button>

                        <TextLink
                            href={logout()}
                            className="mx-auto block text-sm font-semibold text-[#0f6b4f]"
                        >
                            Keluar
                        </TextLink>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
