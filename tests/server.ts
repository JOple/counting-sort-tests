import { counterHttpZipServer } from "../sort/counter-service";
import { latencyClient } from "../utils/latency";

counterHttpZipServer().listen(9000)
