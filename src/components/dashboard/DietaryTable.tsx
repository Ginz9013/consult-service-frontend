import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

const DietaryTable: React.FC = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Time</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Edit</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {
          new Array(5).fill(null).map((_: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">13:01</TableCell>
              <TableCell>Lunch</TableCell>
              <TableCell>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
};

export default DietaryTable;