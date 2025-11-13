import { cn } from '@/lib/utils';
import { getInitials } from '@/utils';
import Image from 'next/image';

const ProfileImage = ({
    url,
    name,
    className,
    textClassName
}: {
    url?: string;
    name: string;
    className?: string;
    textClassName?: string;
}) => {
    if (url)
        return (
            <Image
                src={url}
                alt={name}
                height={40}
                width={40}
                className={cn("flex md:hidden lg:block w-5 h-5 rounded-full object-cover", className)}
            />
        );

    if (name) {
        return (
            <div className={cn("flex md:hidden lg:flex w-8 h-8 rounded-full text-white text-base items-baseline justify-center font-light", className)}>
                <p className={textClassName}>{getInitials(name)}</p>
            </div>
        )
    }
};

export default ProfileImage;