"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Signalement, Media } from "@/types"
import { MessageSquare, Eye, CheckCircle, Archive } from "lucide-react"

const STATUT_CONFIG = {
  recu:       { label: "Reçu",       color: "bg-blue-100 text-blue-700" },
  en_examen:  { label: "En examen",  color: "bg-yellow-100 text-yellow-700" },
  traite:     { label: "Traité",     color: "bg-green-100 text-green-700" },
  classe:     { label: "Classé",     color: "bg-gray-100 text-gray-600" },
}

const TYPE_CONFIG = {
  desequilibre:       "Déséquilibre temps de parole",
  contenu_partisan:   "Contenu partisan",
  temps_non_declare:  "Temps non déclaré",
  autre:              "Autre",
}

export function SignalementsClient() {
  const supabase = createClient()
  const [signalements, setSignalements] = useState<Signalement[]>([])
  const [loading, setLoading] = useState(true)
  const [filtre, setFiltre] = useState<string>("tous")
  const [selected, setSelected] = useState<Signalement | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const { data } = await supabase
      .from("signalements")
      .select("*, media:medias(*), campagne:campagnes(*)")
      .order("created_at", { ascending: false })
    setSignalements((data ?? []) as Signalement[])
    setLoading(false)
  }

  async function updateStatut(id: string, statut: string) {
    await supabase.from("signalements").update({ statut, traite_at: statut === "traite" ? new Date().toISOString() : null }).eq("id", id)
    load()
    setSelected(null)
  }

  const filtered = filtre === "tous" ? signalements : signalements.filter(s => s.statut === filtre)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A3A6B] flex items-center gap-2">
            <MessageSquare className="size-6" /> Signalements citoyens
          </h1>
          <p className="text-gray-500 text-sm mt-1">Infractions signalées par les citoyens et la société civile</p>
        </div>
        <div className="flex gap-2 text-sm">
          {[["tous", "Tous"], ["recu", "Reçus"], ["en_examen", "En examen"], ["traite", "Traités"]].map(([v, l]) => (
            <button key={v} onClick={() => setFiltre(v)}
              className={`px-3 py-1.5 rounded-lg font-medium ${filtre === v ? "bg-[#1A3A6B] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {l} {v === "tous" ? `(${signalements.length})` : `(${signalements.filter(s => s.statut === v).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-4 gap-4">
        {(["recu", "en_examen", "traite", "classe"] as const).map(s => (
          <div key={s} className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-2xl font-bold text-gray-900">{signalements.filter(sg => sg.statut === s).length}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUT_CONFIG[s].color}`}>{STATUT_CONFIG[s].label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Chargement…</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <MessageSquare className="size-12 mx-auto mb-3 opacity-30" />
            <p>Aucun signalement</p>
          </div>
        ) : (
          <table className="w-full">
            <thead><tr className="text-xs text-gray-400 uppercase border-b border-gray-50">
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">Média concerné</th>
              <th className="px-6 py-3 text-left">Signalant</th>
              <th className="px-6 py-3 text-left">Statut</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(sg => (
                <tr key={sg.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(sg.created_at).toLocaleDateString("fr-FR")}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{TYPE_CONFIG[sg.type_infraction]}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{(sg.media as Media)?.nom ?? "Non précisé"}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{sg.nom_signalant ?? "Anonyme"}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUT_CONFIG[sg.statut].color}`}>
                      {STATUT_CONFIG[sg.statut].label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => setSelected(sg)} className="text-gray-400 hover:text-[#1A3A6B] transition-colors">
                        <Eye className="size-4" />
                      </button>
                      {sg.statut === "recu" && (
                        <button onClick={() => updateStatut(sg.id, "en_examen")} className="text-gray-400 hover:text-yellow-600 transition-colors" title="Mettre en examen">
                          <Archive className="size-4" />
                        </button>
                      )}
                      {sg.statut === "en_examen" && (
                        <button onClick={() => updateStatut(sg.id, "traite")} className="text-gray-400 hover:text-green-600 transition-colors" title="Marquer traité">
                          <CheckCircle className="size-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal détail */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-bold text-[#1A3A6B]">Détail du signalement</h2>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUT_CONFIG[selected.statut].color}`}>
                  {STATUT_CONFIG[selected.statut].label}
                </span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-gray-400 text-xs uppercase mb-1">Type</p><p className="font-medium">{TYPE_CONFIG[selected.type_infraction]}</p></div>
                <div><p className="text-gray-400 text-xs uppercase mb-1">Date</p><p className="font-medium">{new Date(selected.created_at).toLocaleDateString("fr-FR")}</p></div>
                <div><p className="text-gray-400 text-xs uppercase mb-1">Signalant</p><p className="font-medium">{selected.nom_signalant ?? "Anonyme"}</p></div>
                <div><p className="text-gray-400 text-xs uppercase mb-1">Contact</p><p className="font-medium">{selected.email_signalant ?? selected.telephone ?? "—"}</p></div>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase mb-1">Description</p>
                <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 rounded-lg p-3">{selected.description}</p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setSelected(null)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">Fermer</button>
              {selected.statut !== "traite" && selected.statut !== "classe" && (
                <button onClick={() => updateStatut(selected.id, selected.statut === "recu" ? "en_examen" : "traite")}
                  className="px-6 py-2 bg-[#1A3A6B] text-white text-sm font-medium rounded-lg hover:bg-[#1A3A6B]/90">
                  {selected.statut === "recu" ? "Mettre en examen" : "Marquer traité"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
