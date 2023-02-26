beforeAll(() => {
    process.env = {
      HASH_CODE: "hashcode",
      HASH_KEY: "hashkey",
      TEST_USERS_CODE: "1234567",
      VAR2: 'value2',
      DATABASE_URL: "",
      _DATABASE_URL: "",
      REDIS_PORT: "",
      REDIS_HOST: "",
      REDIS_PASSWORD: "",
      REDIS_URL: "",
      SOCKET_SERVER: "",
      DB_LOG: "",
      GRAFANA_LOG: "",
      LOG_API: "",
      KAFKA_GRAFANA_LOKI: "",
      KAFKA_BROKER: "",
      GRAFANA_LOKI: "",
      SMS_APIURL: "",
      SMS_TITLE: "Onayla",
      SMS_USERNAME: "onayla",
      SMS_PASSWORD: "",
      SMS_USERCODE: "",
      SMS_ACCOUNTID: "",
      TEST_PHONES: "+905554443322,+905348893565"
    };
  });
  