SELECT 
teams.index AS "Бригада",
SUM(requests.real_duration) AS "Общяя длительность работ"
FROM public.requests 
JOIN public.teams ON requests.team=teams.id
GROUP BY teams.index
ORDER BY SUM(requests.real_duration)
LIMIT 5;