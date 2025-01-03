import { Button } from "@/components/ui/button";
import TotpModal from "@/components/ui/modal/totp-modal";
import { Separator } from "@/components/ui/separator";
import { encodeBase64 } from "@oslojs/encoding";
import { createTOTPKeyURI } from "@oslojs/otp";
import { renderSVG } from "uqr";
import React from "react";
import { getAdminSession } from "@/data/admin";
import { redirect } from "next/navigation";

export default async function page() {
  const { auth, session } = await getAdminSession();
  if (!session) {
    return redirect("/admin-panel/login");
  }
  if (!auth) {
    return redirect("/admin-panel/login");
  }
  const totpKey = new Uint8Array(20);
  crypto.getRandomValues(totpKey);
  const encodedTOTPKey = encodeBase64(totpKey);
  const keyURI = createTOTPKeyURI(
    "Sator Portfolio",
    auth.username,
    totpKey,
    30,
    6,
  );
  const qrcode = renderSVG(keyURI);
  return (
    <div className="p-4">
      <h1 className="text-2xl">Account</h1>
      <Separator className="my-4" />
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="w-1/2">
            <h2>Password</h2>
            <p className="text-xs text-label">
              Strengthen your account by ensuring your password is strong.
            </p>
          </div>
          <Button variant={"outline"}>Change Password</Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-1/2">
            <h2>Authenticator App</h2>
            <p className="text-xs text-label">
              Use an authentication app or browser extension to get two-factor
              authentication codes when prompted.
            </p>
          </div>
          <TotpModal
            qrcode={qrcode}
            encodedTOTPKey={encodedTOTPKey}
            admin={auth}
            session={session}
          />
          {/* <Button variant={"outline"}>Set up</Button> */}
        </div>
      </div>
    </div>
  );
}
