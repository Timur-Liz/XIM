import type { GeneratedMaterial } from "@/types";

const KEY = "him-pomoshnik:materials";

export function loadMaterials(): GeneratedMaterial[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMaterial(item: GeneratedMaterial) {
  const all = loadMaterials();
  const next = [item, ...all.filter((m) => m.id !== item.id)].slice(0, 60);
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // storage full — keep silent
  }
}

export function deleteMaterial(id: string) {
  const all = loadMaterials().filter((m) => m.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function getMaterial(id: string): GeneratedMaterial | undefined {
  return loadMaterials().find((m) => m.id === id);
}
