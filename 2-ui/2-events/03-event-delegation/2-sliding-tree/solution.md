Løsningen har to dele.

1. Pak alle træ-noder ind i `<span>`-elementer. På den måde kan vi CSS-style dem via `:hover` og håndtere klik direkte på teksten, fordi `<span>`-bredden er præcis den samme som tekstbredden.
2. sæt en handler på træets rod-node og håndter klik på de enkelte `<span>`-titler.
