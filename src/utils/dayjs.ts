import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import toObject from "dayjs/plugin/toObject";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);
// dayjs.extend(relativeTime);
// dayjs.extend(toObject);

export default dayjs;

