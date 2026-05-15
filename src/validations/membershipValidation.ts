import { z } from 'zod';

const registrationSchema = z.object({
    body: z.object({
        email: z
            .email(JSON.stringify({ status: 102, message: 'Parameter email tidak sesuai format' }))
            .max(50),
        first_name: z
            .string(JSON.stringify({ status: 102, message: 'Parameter first_name wajib diisi' }))
            .max(100),
        last_name: z
            .string(JSON.stringify({ status: 102, message: 'Parameter last_name wajib diisi' }))
            .max(100),
        password: z
            .string('Parameter password wajib diisi')
            .min(8, JSON.stringify({ status: 103, message: 'Password minimal 8 karakter' }))
            .max(50),
    }),
});

const loginSchema = z.object({
    body: z.object({
        email: z
            .email(JSON.stringify({ status: 102, message: 'Parameter email tidak sesuai format' }))
            .max(50),
        password: z
            .string(JSON.stringify({ status: 102, message: 'Parameter password wajib diisi' }))
            .min(8, JSON.stringify({ status: 103, message: 'Username atau password salah' }))
            .max(50),
    }),
});

const profileUpdateSchema = z.object({
    body: z.object({
        first_name: z
            .string(JSON.stringify({ status: 102, message: 'Parameter first_name wajib diisi' }))
            .max(100),
        last_name: z
            .string(JSON.stringify({ status: 102, message: 'Parameter last_name wajib diisi' }))
            .max(100),
    }),
});

const ALLOWED_IMAGE_MIME = ['image/jpeg', 'image/jpg', 'image/png'];

const profileImageSchema = z.object({
    file: z
        .custom<Express.Multer.File>(
            (file) => file instanceof Object,
            JSON.stringify({ status: 103, message: 'Image tidak valid' })
        )
        .superRefine((file, ctx) => {
            if (!ALLOWED_IMAGE_MIME.includes(file.mimetype))
                return ctx.addIssue(
                    JSON.stringify({ status: 103, message: 'Format Image tidak sesuai' })
                );
        }),
});

export { registrationSchema, loginSchema, profileUpdateSchema, profileImageSchema };
