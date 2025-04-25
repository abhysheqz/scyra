import { auth, signOut } from "@/auth";
import Card from "@/components/card";
import Button from "@/components/shared/button";
import PageWrapper from "@/components/shared/page-wraper";
import TestButton from "@/components/shared/test-button";
import Image from "next/image";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    return (
      <PageWrapper className="flex justify-center items-center">
        <p className="text-2xl text-white">You are not authenticated</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="flex justify-center items-center">
      <Card className="gap-10">
        <Image
          src={session.user?.image || ""}
          alt="Profile Photo"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="text-center">
          <p className="text-2xl text-white">Welcome, {session.user?.name}</p>
          <p className="text-lg text-white">{session.user?.email}</p>
        </div>
        <Button
          variant={"danger"}
          onClick={async () => {
            "use server";
            await signOut();
          }}
        >
          Sign Out
        </Button>
        <TestButton />
      </Card>
    </PageWrapper>
  );
}
