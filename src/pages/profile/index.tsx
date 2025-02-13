import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth/api";
import { clearAllStore } from "@/store/clear";

const Profile = () => {
    const router = useRouter();
    const [user, setUser] = useUser();

    const handlerLogout = async () => {
        const res = await logout();
        if(res.status === 200) {
            clearAllStore(); 
            await router.replace("/login");
        }
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center">
                <Avatar className="w-24 h-24">
                    <AvatarImage src={ user.avatarImg ?? "https://github.com/shadcn.png" } className="object-cover" alt="AvatarImage" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <ul className="flex flex-col gap-2">
                    <li>名稱：{user.nickname}</li>
                    <li>信箱：{user.email}</li>
                    <li>密碼：********</li>
                </ul>
            </div>
            <p className="my-6">下次諮詢日期：{user.nextConsultation}</p>
            <Button
                onClick={handlerLogout}
                className="w-full mt"
            >
                Log Out
            </Button>
        </div>
    );
};

Profile.getLayout = (page: React.ReactNode) => (
    <Layout>
      { page }
    </Layout>
);

export default Profile;