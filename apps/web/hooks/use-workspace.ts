"use client"

import { useWorkspace } from "@/components/providers/workspace-provider"

export function useWorkspaceState() {
  return useWorkspace()
}
