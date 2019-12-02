SELECT 
'ул. ' || addresses.street || 
', д. ' || addresses.house|| 
', корп. ' || addresses.build || 
', эт. ' || addresses.floor||
', кв. ' || addresses.flat AS "Адрес",
COUNT(requests.task) AS "Количество вызовов"
FROM public.addresses 
JOIN public.requests ON requests.address=addresses.id
GROUP BY addresses.street, addresses.house, addresses.build, addresses.floor, addresses.flat
ORDER BY COUNT(requests.task) DESC
LIMIT 5;