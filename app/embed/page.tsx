import EmbedClient from "@/app/components/EmbedClient";
import { getSession } from "@/app/lib/getSession";

export default async function Page() {
    const session = await getSession();

    return (
        <div>
            <EmbedClient ownerId={session?.user?.id || ""} />
        </div>
    );
}