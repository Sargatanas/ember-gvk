SELECT 
teams.index AS "Бригада",
SUM(requests.real_duration) AS "Общяя длительность работ",
extract(MONTH from requests.date) AS "Месяц"
FROM public.requests 
JOIN public.teams ON requests.team=teams.id
GROUP BY teams.index, extract(MONTH from requests.date)
ORDER BY extract(MONTH from requests.date), teams.index;