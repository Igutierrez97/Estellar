"use client";

import { useState, useEffect, useCallback } from "react";
import { MetObject } from "@/lib/api/types";
import { getObjectClient } from "@/lib/api/met";

interface FavoritesState {
  /** IDs guardados en localStorage */
  ids: number[];
  /** Obras completas ya fetcheadas (cache en memoria) */
  objects: MetObject[];
  /** Objeto de lookup para no duplicar fetches */
  objectsMap: Map<number, MetObject>;
  /** true mientras lee localStorage por primera vez */
  hydrated: boolean;
  /** true mientras está fetcheando obras nuevas */
  loading: boolean;
}

export function useFavorites() {
  const [state, setState] = useState<FavoritesState>({
    ids: [],
    objects: [],
    objectsMap: new Map(),
    hydrated: false,
    loading: false,
  });

  // Leer localStorage solo en el cliente (después del mount)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("stellar-favorites");
      const ids: number[] = stored ? JSON.parse(stored) : [];
      setState((prev) => ({ ...prev, ids, hydrated: true }));
    } catch {
      setState((prev) => ({ ...prev, hydrated: true }));
    }
  }, []);

  // Cuando se hidrata y hay IDs, fetchear las obras que no tengamos cacheadas
  useEffect(() => {
    if (!state.hydrated || state.ids.length === 0) return;

    const missingIds = state.ids.filter(
      (id) => !state.objectsMap.has(id)
    );

    if (missingIds.length === 0) return;

    let cancelled = false;

    async function fetchMissing() {
      setState((prev) => ({ ...prev, loading: true }));

      const results = await Promise.allSettled(
        missingIds.map((id) => getObjectClient(id))
      );

      if (cancelled) return;

      const newObjects: MetObject[] = [];
      const newMap = new Map(state.objectsMap);

      results.forEach((result, i) => {
        if (result.status === "fulfilled" && result.value) {
          const obj = result.value;
          if (obj.primaryImage) {
            newObjects.push(obj);
            newMap.set(missingIds[i], obj);
          }
        }
      });

      setState((prev) => ({
        ...prev,
        objects: [...prev.objects, ...newObjects],
        objectsMap: newMap,
        loading: false,
      }));
    }

    fetchMissing();

    return () => {
      cancelled = true;
    };
    // Solo re-ejecutar cuando cambian los IDs o termina la hidratación
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.hydrated, state.ids.length]);

  const toggle = useCallback((id: number) => {
    setState((prev) => {
      const nextIds = prev.ids.includes(id)
        ? prev.ids.filter((fid) => fid !== id)
        : [...prev.ids, id];

      // Actualizar localStorage
      localStorage.setItem("stellar-favorites", JSON.stringify(nextIds));

      // Actualizar objects y objectsMap
      const nextMap = new Map(prev.objectsMap);
      const nextObjects = prev.ids.includes(id)
        ? prev.objects.filter((o) => o.objectID !== id)
        : prev.objects;

      if (!prev.ids.includes(id)) {
        // Si acabamos de agregar, todavía no tenemos el objeto
        // Se fetcheará en el useEffect de arriba
      } else {
        nextMap.delete(id);
      }

      return {
        ...prev,
        ids: nextIds,
        objects: nextObjects,
        objectsMap: nextMap,
      };
    });
  }, []);

  const isFavorite = useCallback(
    (id: number) => state.ids.includes(id),
    [state.ids]
  );

  const clearAll = useCallback(() => {
    localStorage.removeItem("stellar-favorites");
    setState({
      ids: [],
      objects: [],
      objectsMap: new Map(),
      hydrated: true,
      loading: false,
    });
  }, []);

  return {
    ids: state.ids,
    objects: state.objects,
    hydrated: state.hydrated,
    loading: state.loading,
    toggle,
    isFavorite,
    clearAll,
  };
}