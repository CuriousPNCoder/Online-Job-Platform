import { Badge } from "@/components/ui/Badge";
import { ApplicationStatus } from "@/lib/types";

export const StatusBadge = ({ status }: { status: ApplicationStatus }): JSX.Element => <Badge value={status} />;
