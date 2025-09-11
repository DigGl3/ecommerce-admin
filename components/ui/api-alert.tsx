import { Alert, AlertTitle } from "@/components/ui/alert";
import { Server } from "lucide-react";
import { Badge } from "./badge";

interface ApiAlertProps {
    title: string;
    description: string;
    variant : "public" | "admin"
};

const textMap : Record<ApiAlertProps["variant"],string> = {
    public: "Public",
    admin: "Admin"
}

const variantMap : Record<ApiAlertProps["variant"],string> = {
    public: "secondary",
    admin: "destructive"
}

export const ApiAlert : React.FC<ApiAlertProps> = ({
    title,
    description,
    variant = "public"
}) => {
    return (
        <Alert>
            <Server className="h-4 w-4"/>
            <AlertTitle className="flex items-center gap-x-2">
                {title}
                <Badge>{textMap[variant]}</Badge>
            </AlertTitle>
        </Alert>
    )
}