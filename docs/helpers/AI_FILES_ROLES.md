# 📚 Ściąga: dokumenty w Error Garden

Ten plik jest krótką mapą: **który dokument jest od czego**, **kiedy go ruszać** i **czego do niego nie wkładać**, żeby nie dublować informacji.

---

## 🏠 README.md (Front door na GitHub)

**Rola:** pierwsze wrażenie + szybkie uruchomienie projektu dla ludzi.  
**Dla kogo:** odwiedzający repo, nowi współtwórcy, Ty (w trybie “po miesiącu wracam”).

✅ **Zawiera:**

- co to jest Error Garden i do czego służy
- najważniejsze “key ideas” (krótko)
- quick start + komendy
- linki do: ROADMAP / ARCHITECTURE / AGENTS / PR_GUIDE

🚫 **Nie zawiera:**

- szczegółowej struktury folderów
- pełnych konwencji i reguł importów (to jest w ARCHITECTURE)

🛠️ **Kiedy aktualizować:**

- gdy zmienia się sposób uruchamiania, skrypty, stack
- gdy zmienia się “misja” projektu lub główne feature’y

---

## 🗺️ ROADMAP.md (Plan etapów)

**Rola:** opisuje _gdzie zmierzamy_ i _co jest w jakim etapie_.  
**Dla kogo:** Ty, społeczność, AI (priorytety).

✅ **Zawiera:**

- etapy (MVP / v1 / v2 / …)
- scope, definition of done, out of scope
- ryzyka i zależności
- linki do milestone’ów / issues (jeśli używasz)

🚫 **Nie zawiera:**

- struktury folderów
- szczegółów implementacyjnych (“w tym pliku zrób to…”)  
  To powinno żyć w issues/PR-ach albo w kodzie.

🛠️ **Kiedy aktualizować:**

- gdy zmieniają się priorytety albo zakres etapów
- gdy kończysz etap i chcesz go domknąć w dokumencie

---

## 🧱 docs/ARCHITECTURE.md (Single Source of Truth)

**Rola:** jedyne miejsce, gdzie trzymamy **architekturę**, **granice warstw**, **konwencje** i “kontrakt” projektu.  
**Dla kogo:** Ty, współtwórcy, AI.

✅ **Zawiera:**

- granice: domain vs app vs UI
- zasady importów (czego nie wolno w domenie)
- konwencje modułów (`types.ts` jako jedyne źródło typów, testy w `__tests__/`)
- struktura folderów (jako kontrakt)
- kontrakt filtrów URL
- helpery unikające rozjazdów: `normalizeTags()` i `filterToSearchParams()`

🚫 **Nie zawiera:**

- roadmapy i planu prac (to jest w ROADMAP)
- checklist PR (to jest w PR_GUIDE)
- długich opisów “po co istnieje projekt” (to jest w README)

🛠️ **Kiedy aktualizować:**

- gdy zmieniasz architekturę lub konwencje
- gdy widzisz, że zaczyna się “rozjeżdżać prawda” w repo

---

## 🤝 AGENTS.md (AI Contract)

**Rola:** twarde zasady dla AI (Codex/VSCode/itp.) + workflow współpracy.  
**Dla kogo:** głównie AI, ale też Ty (żeby pilnować jakości i granic).

✅ **Zawiera:**

- non-negotiables (np. domain purity, brak I/O w domenie)
- zasady “jak AI ma pracować”: kiedy pyta o pliki, jak daje diffy
- zakazy: brak scope creep, brak ukrytych importów, brak nowych deps bez zgody
- naming: kod używa `trap`, UI pokazuje **weeds**
- test expectations (np. mock `next/navigation` w testach UI)

🚫 **Nie zawiera:**

- pełnej architektury (linkuje do ARCHITECTURE)
- roadmapy (linkuje do ROADMAP)

🛠️ **Kiedy aktualizować:**

- gdy AI zrobi coś “nie tak” i chcesz dodać regułę, żeby już nie powtórzyć
- gdy zmieniasz proces pracy (np. jak robimy PR-y)

---

## 🚦 PR_GUIDE.md (Proces PR)

**Rola:** “jak robimy PR-y” – checklisty, standardy, opis PR-a.  
**Dla kogo:** Ty i każdy kto będzie robił PR-y, także AI.

✅ **Zawiera:**

- filozofię małych PR
- template opisu PR
- checklistę (testy, brak scope creep, domena czysta, docs aktualne)

🚫 **Nie zawiera:**

- architektury i reguł warstw (linkuje do ARCHITECTURE)
- roadmapy (linkuje do ROADMAP)

🛠️ **Kiedy aktualizować:**

- gdy w review powtarzają się te same problemy
- gdy zmieniasz standard commitów/PR

---

## 🔖 docs/adr/\* (opcjonalnie) (Decision log)

**Rola:** krótkie notki “dlaczego tak zrobiliśmy” (decyzje architektoniczne).  
**Dla kogo:** Ty “z przyszłości”, współtwórcy, AI.

✅ **Zawiera:**

- kontekst → decyzja → konsekwencje → linki do PR/commita

🚫 **Nie zawiera:**

- pełnej dokumentacji architektury (to jest ARCHITECTURE)
- planu prac (to jest ROADMAP)

🛠️ **Kiedy pisać:**

- po większej decyzji (np. “persist przez zustand”, “two-entry seeds”)
- nie po każdej drobnostce

---

# 🧭 Zasada anty-duplikacji (złota reguła)

**Jedna informacja ma jedno źródło prawdy:**

- Architektura/struktura/konwencje → `docs/ARCHITECTURE.md`
- Plan etapów → `ROADMAP.md`
- Kontrakt AI → `AGENTS.md`
- “Wejście” i uruchomienie → `README.md`
- Proces PR → `PR_GUIDE.md`
- “Dlaczego” decyzji → `docs/adr/*`

Reszta tylko **linkuje**, nie kopiuje.

🌿 Dzięki temu dokumenty rosną bez bólu i bez poprawiania tego samego w dwóch miejscach.
