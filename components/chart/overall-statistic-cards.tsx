import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { HiUserGroup } from "react-icons/hi2";
import { MdArticle, MdDesignServices } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { useTranslations } from "next-intl";

export default function OverallStatisticCards() {
  const t = useTranslations("Dashboard");
  return (
    <>
      <h1 className="text-2xl font-bold">{t("dashboard")}</h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FaUser className="text-label" size={12} />
              <h1 className="text-sm text-label">Today visitor</h1>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-3xl">20</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-muted">
              <MdArticle className="text-label" size={14} />
              <h1 className="text-sm text-label">Total blog views</h1>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-3xl">1000</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MdDesignServices className="text-label" size={14} />
              <h1 className="text-sm text-label">Total portfolio views</h1>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-3xl">330</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="text-muteds flex items-center gap-2">
              <HiUserGroup className="text-label" size={14} />
              <h1 className="text-sm text-label">Total vistor</h1>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-3xl">500</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
