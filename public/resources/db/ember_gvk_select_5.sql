SELECT
teams.index AS "Бригада",
'00:00:00' AS "Общяя длительность работ"
FROM public.requests 
RIGHT JOIN public.teams ON requests.team=teams.id
WHERE requests.team IS NULL

UNION

SELECT
teams.index AS "Бригада",
SUM(requests.real_duration) AS "Общяя длительность работ"
FROM public.requests 
JOIN public.teams ON requests.team=teams.id
GROUP BY teams.index

ORDER BY "Общяя длительность работ"

LIMIT 5;