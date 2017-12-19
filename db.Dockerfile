FROM mysql:8

CMD mysqld --user=root --skip-grant-tables \
    && mysql -u root -e "CREATE USER user@'%' IDENTIFIED BY 'pass'"

