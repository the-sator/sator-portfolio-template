import { DataTable } from "@/components/ui/data-table";
import { RoleColumns } from "@/components/ui/table/columns/role.column";
import { getAllRoles } from "@/data/role";
import { getTranslations } from "next-intl/server";
import React from "react";
import {
  CreateRoleModal,
  EditRoleModal,
} from "@/components/ui/modal/role-modal";
import { getAllResources } from "@/data/resource";

export default async function page() {
  const t = await getTranslations("Role");
  const [
    { data: roles, error: roleErr },
    { data: resources, error: resourceErr },
  ] = await Promise.all([getAllRoles(), getAllResources()]);
  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl">{t("role")}</h1>
        <CreateRoleModal resources={resources} error={resourceErr} />
        <EditRoleModal resources={resources} roles={roles} />
      </div>
      <DataTable columns={RoleColumns} data={roles || []} error={roleErr} />
    </div>
  );
}
